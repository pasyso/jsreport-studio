
const omit = require('lodash/omit')

async function collectEntitiesInHierarchy (reporter, items, sourceEntity, referenceProperty, req) {
  if (sourceEntity.__entitySet === 'folders') {
    items.push(sourceEntity)

    const lookup = []

    Object.entries(reporter.documentStore.model.entitySets).forEach(([k, entitySet]) => {
      lookup.push(reporter.documentStore.collection(k).find({
        [referenceProperty]: {
          shortid: sourceEntity.shortid
        }
      }, req).then((results) => {
        if (results.length === 0) {
          return
        }

        if (k === 'folders') {
          return Promise.all(results.map((folder) => {
            return collectEntitiesInHierarchy(
              reporter,
              items,
              Object.assign(folder, { __entitySet: k }),
              referenceProperty,
              req
            )
          }))
        } else {
          results.forEach((entity) => {
            items.push(Object.assign(entity, {
              __entitySet: k
            }))
          })
        }
      }))
    })

    await Promise.all(lookup)
  } else {
    items.push(sourceEntity)
  }
}

async function throwIfEntityIsNotFolder (reporter, targetShortid, req) {
  const folder = await reporter.documentStore.collection('folders').findOne({
    shortid: targetShortid
  }, req)

  if (!folder) {
    throw new Error(`Target entity "${targetShortid}" is not a folder, please review that the copy/move is against a valid folder entity`)
  }
}

module.exports = async function hierarchyMove (reporter, {
  sourceInfo,
  targetInfo,
  shouldCopy,
  shouldReplace
}, req) {
  if (!targetInfo.referenceProperty) {
    throw new Error('target should specify ".referenceProperty"')
  }

  if (targetInfo.shortid === undefined) {
    throw new Error('target should specify ".shortid"')
  }

  const sourceCol = reporter.documentStore.collection(sourceInfo.entitySet)

  if (!sourceCol) {
    throw new Error(`Invalid entity set "${sourceInfo.entitySet}" for source`)
  }

  const sourceEntity = await sourceCol.findOne({ _id: sourceInfo.id }, req)

  if (!sourceEntity) {
    throw new Error('Source entity with specified id does not exists')
  }

  let items = []

  await collectEntitiesInHierarchy(
    reporter,
    items,
    Object.assign(sourceEntity, { __entitySet: sourceInfo.entitySet }),
    targetInfo.referenceProperty,
    req
  )

  if (!shouldCopy) {
    // ignore if we are doing a move at the same level of hierarchy between source and target
    if (
      sourceEntity[targetInfo.referenceProperty] != null &&
      targetInfo.shortid != null &&
      sourceEntity[targetInfo.referenceProperty] === targetInfo.shortid
    ) {
      return []
    }

    // validates that we can't move entities from higher level
    // into lower level of the same hierarchy
    if (items.some((item) => item.shortid === targetInfo.shortid)) {
      return []
    }

    await throwIfEntityIsNotFolder(reporter, targetInfo.shortid, req)

    let updateQ

    if (targetInfo.shortid === null) {
      updateQ = {
        $set: {
          [targetInfo.referenceProperty]: null
        }
      }
    } else {
      updateQ = {
        $set: {
          [targetInfo.referenceProperty]: {
            shortid: targetInfo.shortid
          }
        }
      }
    }

    try {
      await reporter.documentStore.collection(sourceCol.entitySet).update({
        _id: sourceEntity._id
      }, updateQ, req)
    } catch (e) {
      if (e.code === 'DUPLICATED_ENTITY' && shouldReplace) {
        const removeFolderQ = targetInfo.shortid === null ? { folder: null } : { folder: { shortid: targetInfo.shortid } }

        await reporter.documentStore.collection(e.refEntitySet).remove({
          _id: e.refEntityId,
          ...removeFolderQ
        }, req)

        await reporter.documentStore.collection(sourceCol.entitySet).update({
          _id: sourceEntity._id
        }, updateQ, req)
      }

      throw e
    }

    items.forEach((item) => {
      if (item._id === sourceEntity._id) {
        if (targetInfo.shortid === null) {
          item[targetInfo.referenceProperty] = null
        } else {
          item[targetInfo.referenceProperty] = {
            shortid: targetInfo.shortid
          }
        }
      }
    })
  } else {
    // copy of folders does nothing for now (disabled), the logic bellow supports it
    // but we need to resolve some problems about updating references fields
    // of clones to ids of newer entities before we can enable this feature in folders for normal usage
    if (sourceEntity.__entitySet === 'folders') {
      return []
    }

    await throwIfEntityIsNotFolder(reporter, targetInfo.shortid, req)

    const newItems = []
    const newHierarchyMap = {}

    await Promise.all(items.map(async (item) => {
      const entitySetName = item.__entitySet

      const newEntity = {
        ...omit(item, ['_id', 'shortid', '__entitySet', targetInfo.referenceProperty])
      }

      if (sourceInfo.id === item._id) {
        if (targetInfo.shortid === null) {
          newEntity[targetInfo.referenceProperty] = null
        } else {
          newEntity[targetInfo.referenceProperty] = {
            shortid: targetInfo.shortid
          }
        }
      }

      const result = await reporter.documentStore.collection(entitySetName).insert(newEntity, req)

      result.__entitySet = item.__entitySet

      newHierarchyMap[result._id] = { old: item, new: result, entitySet: result.__entitySet }

      newItems.push(result)
    }))

    await Promise.all(newItems.map(async (newItem) => {
      const newEntityRecord = newHierarchyMap[newItem._id]
      let newShortid = null

      if (newItem[targetInfo.referenceProperty] != null) {
        return
      }

      Object.keys(newHierarchyMap).some((newId) => {
        const currentItemRecord = newHierarchyMap[newId]

        if (
          newEntityRecord.old[targetInfo.referenceProperty] != null &&
          newEntityRecord.old[targetInfo.referenceProperty].shortid === currentItemRecord.old.shortid
        ) {
          newShortid = currentItemRecord.new.shortid
          return true
        }

        return false
      })

      // updating in-memory representation
      newItem[targetInfo.referenceProperty] = {
        shortid: newShortid
      }

      let updateQ

      if (newShortid === null) {
        updateQ = {
          $set: {
            [targetInfo.referenceProperty]: null
          }
        }
      } else {
        updateQ = {
          $set: {
            [targetInfo.referenceProperty]: {
              shortid: newShortid
            }
          }
        }
      }

      return reporter.documentStore.collection(newEntityRecord.entitySet).update({
        _id: newItem._id
      }, updateQ, req)
    }))

    items = newItems
  }

  return items
}
