
module.exports = (entitySetsNames, entities, getEntityTypeNameAttr) => {
  const newItems = []
  const allFoldersEntities = Studio.getReferences().folders || []
  const entitiesByFolderLevel = {}

  // group folders first
  allFoldersEntities.forEach((entityFolder) => {
    groupEntityByFolderLevel(entitiesByFolderLevel, allFoldersEntities, entityFolder)
  })

  entitySetsNames.forEach((entitySetName) => {
    if (entitySetName === 'folders') {
      return
    }

    const entitiesInSet = entities[entitySetName]

    if (!entitiesInSet) {
      return
    }

    let entitiesInSetCount = entitiesInSet.length

    for (let j = 0; j < entitiesInSetCount; j++) {
      groupEntityByFolderLevel(entitiesByFolderLevel, allFoldersEntities, entitiesInSet[j])
    }
  })

  addItemsByHierarchy(newItems, entitiesByFolderLevel, getEntityTypeNameAttr)

  return newItems
}


function addItemsByHierarchy (newItems, entitiesByFolderLevel, getEntityTypeNameAttr, level = 0, parentFolderShortId) {
  const entitiesInLevel = entitiesByFolderLevel[level]
  const foldersInLevel = []
  const otherEntitiesInLevel = []

  if (!entitiesInLevel) {
    return
  }

  entitiesInLevel.forEach((entity) => {
    if (parentFolderShortId && parentFolderShortId !== entity.folder) {
      return
    }

    if (entity.__entitySet === 'folders') {
      foldersInLevel.push({
        name: entity.name,
        isGroup: true,
        isEntity: true,
        data: entity,
        items: []
      })
    } else {
      otherEntitiesInLevel.push({
        name: getEntityTypeNameAttr(entity.__entitySet, entity),
        data: entity
      })
    }
  })

  foldersInLevel.forEach((i) => newItems.push(i))
  otherEntitiesInLevel.forEach((i) => newItems.push(i))

  if (foldersInLevel.length > 0) {
    foldersInLevel.forEach((f) => {
      addItemsByHierarchy(f.items, entitiesByFolderLevel, getEntityTypeNameAttr, level + 1, f.data.shortid)
    })
  }
}

function findFolderInSet (folderSet, folderShortId) {
  let folder

  const found = folderSet.some((folderInSet) => {
    folder = folderInSet
    return folderInSet.shortid === folderShortId
  })

  if (found) {
    return folder
  }

  return undefined
}

function groupEntityByFolderLevel (collection, allFolders, entity) {
  let level = 0
  let currentFolder

  if (entity.__entitySet === 'folders') {
    currentFolder = findFolderInSet(allFolders, entity.shortid)

    if (currentFolder && currentFolder.folder != null) {
      currentFolder = findFolderInSet(allFolders, currentFolder.folder)
    } else {
      currentFolder = null
    }
  } else if (entity.folder != null) {
    currentFolder = findFolderInSet(allFolders, entity.folder)
  }

  while (currentFolder) {
    level++

    if (currentFolder.folder != null) {
      currentFolder = findFolderInSet(allFolders, currentFolder.folder)
    } else {
      currentFolder = null
    }
  }

  if (collection[level] == null) {
    collection[level] = []
  }

  collection[level].push(entity)
}
