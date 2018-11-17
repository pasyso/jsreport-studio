
const omit = require('lodash/omit')
const getCloneName = require('../shared/getCloneName')

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

module.exports = async function hierarchyMove (reporter, {
  sourceInfo,
  targetInfo,
  shouldCopy
}, req) {
  const entitySetNameAttrMap = Object.keys(reporter.documentStore.model.entitySets).reduce((acu, setName) => {
    const entitySet = reporter.documentStore.model.entitySets[setName]

    if (entitySet.entityTypePublicKey != null) {
      acu[setName] = entitySet.entityTypePublicKey
    }

    return acu
  }, {})

  if (!targetInfo.referenceProperty) {
    throw new Error('target should specify ".referenceProperty"')
  }

  if (targetInfo.shortid === undefined) {
    throw new Error('target should specify ".shortid"')
  }

  if (!entitySetNameAttrMap) {
    throw new Error('entitySet name attribute map is required')
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

    await reporter.documentStore.collection(sourceCol.entitySet).update({
      _id: sourceEntity._id
    }, updateQ, req)

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

    const newItems = []
    const newHierarchyMap = {}

    // validating that we have the nameAttr of all entitySets used in items
    items.forEach((item) => {
      const entitySetName = item.__entitySet
      const nameAttr = entitySetNameAttrMap[entitySetName]

      if (nameAttr == null) {
        throw new Error(`Can not find the name attribute of entitySet "${entitySetName}"`)
      }

      if (item[nameAttr] == null) {
        throw new Error(`Entity ("${entitySetName}") does not have any value in name attribute, name attribute: ${nameAttr}`)
      }
    })

    await Promise.all(items.map(async (item) => {
      const entitySetName = item.__entitySet
      const nameAttr = entitySetNameAttrMap[entitySetName]

      let valid = false
      let newName

      while (!valid) {
        if (newName == null) {
          newName = item[nameAttr]
        } else {
          newName = getCloneName(newName)
        }

        const foundQuery = targetInfo.shortid != null ? {
          [targetInfo.referenceProperty]: { shortid: targetInfo.shortid }
        } : { [targetInfo.referenceProperty]: null }

        const found = await reporter.documentStore.collection(entitySetName).findOne({
          [nameAttr]: newName,
          ...foundQuery
        }, req)

        valid = found == null
      }

      const newEntity = {
        ...omit(item, ['_id', 'shortid', '__entitySet', targetInfo.referenceProperty]),
        [nameAttr]: newName
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
