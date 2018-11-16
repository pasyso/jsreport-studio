import 'should'

const jsreport = require('jsreport-core')
const getCloneName = require('../shared/getCloneName')
const hierarchyMove = require('../lib/hierarchyMove')

describe('hierarchyMove', () => {
  let reporter

  beforeEach(async () => {
    reporter = jsreport()

    reporter.use(require('../')())

    reporter.use(() => {
      Object.assign(reporter.documentStore.model.entityTypes['TemplateType'], {
        _id: { type: 'Edm.String', key: true },
        shortid: { type: 'Edm.String' },
        name: { type: 'Edm.String', publicKey: true },
        modificationDate: { type: 'Edm.DateTimeOffset' }
      })

      reporter.documentStore.registerEntitySet('templates', {
        entityType: 'jsreport.TemplateType',
        humanReadableKey: 'shortid',
        splitIntoDirectories: true
      })
    })

    await reporter.init()
  })

  // eslint-disable-next-line
  afterEach(() => reporter.close())

  it('should move file', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2'
    })

    const a = await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'c',
      folder: { shortid: folder2.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'templates',
        id: a._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: folder2.shortid
      }
    })

    const templatesInFolder2 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder2.shortid
      }
    })).map((e) => e.name).sort()

    templatesInFolder2.should.eql(['a', 'c'])
  })

  it('should move folder', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2'
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'c',
      folder: { shortid: folder2.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'folders',
        id: folder2._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: folder1.shortid
      }
    })

    const foldersInFolder1 = (await reporter.documentStore.collection('folders').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder1 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder2 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder2.shortid
      }
    })).map((e) => e.name).sort()

    foldersInFolder1.should.eql(['folder2'])
    templatesInFolder1.should.eql(['a', 'b'])
    templatesInFolder2.should.eql(['c'])
  })

  it('should copy file', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2'
    })

    const a = await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'c',
      folder: { shortid: folder2.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'templates',
        id: a._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: folder2.shortid
      },
      shouldCopy: true
    })

    const templatesInFolder1 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder2 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder2.shortid
      }
    })).map((e) => e.name).sort()

    templatesInFolder1.should.eql(['a', 'b'])
    templatesInFolder2.should.eql(['a', 'c'])
  })

  it('should change name when found duplicate during copy file', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2'
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    const bInFolder2 = await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder2.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'templates',
        id: bInFolder2._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: folder1.shortid
      },
      shouldCopy: true
    })

    const templatesInFolder1 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder2 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder2.shortid
      }
    })).map((e) => e.name).sort()

    templatesInFolder1.should.eql(['a', 'b', getCloneName('b')])
    templatesInFolder2.should.eql(['b'])
  })

  // pending feature, copy of folder is implemented but disabled until we solve
  // some consistency problems with entity's properties that contains references to other entities
  it('should copy folder')

  it('should move to top level', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2'
    })

    const folder3 = await reporter.documentStore.collection('folders').insert({
      name: 'folder3',
      folder: { shortid: folder2.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    const c = await reporter.documentStore.collection('templates').insert({
      name: 'c',
      folder: { shortid: folder2.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'd',
      folder: { shortid: folder3.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'templates',
        id: c._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: null
      }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'folders',
        id: folder3._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: null
      }
    })

    const templatesInRoot = (await reporter.documentStore.collection('templates').find({
      folder: null
    })).map((e) => e.name).sort()

    const foldersInRoot = (await reporter.documentStore.collection('folders').find({
      folder: null
    })).map((e) => e.name).sort()

    const templatesInFolder2 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder2.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder3 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder3.shortid
      }
    })).map((e) => e.name).sort()

    templatesInFolder2.should.eql([])
    templatesInFolder3.should.eql(['d'])

    templatesInRoot.should.eql(['c'])
    foldersInRoot.should.eql(['folder1', 'folder2', 'folder3'])
  })

  it('should copy to top level', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2'
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    const c = await reporter.documentStore.collection('templates').insert({
      name: 'c',
      folder: { shortid: folder2.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'templates',
        id: c._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: null
      },
      shouldCopy: true
    })

    const templatesInRoot = (await reporter.documentStore.collection('templates').find({
      folder: null
    })).map((e) => e.name).sort()

    const templatesInFolder2 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder2.shortid
      }
    })).map((e) => e.name).sort()

    templatesInFolder2.should.eql(['c'])

    templatesInRoot.should.eql(['c'])
  })

  it('move should work recursively', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2',
      folder: {
        shortid: folder1.shortid
      }
    })

    const folder3 = await reporter.documentStore.collection('folders').insert({
      name: 'folder3',
      folder: { shortid: folder2.shortid }
    })

    const folder4 = await reporter.documentStore.collection('folders').insert({
      name: 'folder4'
    })

    const folder5 = await reporter.documentStore.collection('folders').insert({
      name: 'folder5',
      folder: {
        shortid: folder4.shortid
      }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'c',
      folder: { shortid: folder2.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'd',
      folder: { shortid: folder3.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'e',
      folder: { shortid: folder5.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'folders',
        id: folder2._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: folder4.shortid
      }
    })

    const foldersInFolder4 = (await reporter.documentStore.collection('folders').find({
      folder: {
        shortid: folder4.shortid
      }
    })).map((e) => e.name).sort()

    const foldersInFolder1 = (await reporter.documentStore.collection('folders').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder5 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder5.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder1 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    templatesInFolder1.should.eql(['a', 'b'])
    templatesInFolder5.should.eql(['e'])

    foldersInFolder4.should.eql(['folder2', 'folder5'])
    foldersInFolder1.should.eql([])
  })

  it('should not let move from parent entity into child entity', async () => {
    const folder1 = await reporter.documentStore.collection('folders').insert({
      name: 'folder1'
    })

    const folder2 = await reporter.documentStore.collection('folders').insert({
      name: 'folder2',
      folder: {
        shortid: folder1.shortid
      }
    })

    const folder3 = await reporter.documentStore.collection('folders').insert({
      name: 'folder3',
      folder: { shortid: folder2.shortid }
    })

    const folder4 = await reporter.documentStore.collection('folders').insert({
      name: 'folder4',
      folder: { shortid: folder3.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'a',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'b',
      folder: { shortid: folder1.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'c',
      folder: { shortid: folder2.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'd',
      folder: { shortid: folder3.shortid }
    })

    await reporter.documentStore.collection('templates').insert({
      name: 'e',
      folder: { shortid: folder4.shortid }
    })

    await hierarchyMove(reporter, {
      sourceInfo: {
        entitySet: 'folders',
        id: folder2._id
      },
      targetInfo: {
        referenceProperty: 'folder',
        shortid: folder4.shortid
      }
    })

    const foldersInFolder4 = (await reporter.documentStore.collection('folders').find({
      folder: {
        shortid: folder4.shortid
      }
    })).map((e) => e.name).sort()

    const foldersInFolder1 = (await reporter.documentStore.collection('folders').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder4 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder4.shortid
      }
    })).map((e) => e.name).sort()

    const templatesInFolder1 = (await reporter.documentStore.collection('templates').find({
      folder: {
        shortid: folder1.shortid
      }
    })).map((e) => e.name).sort()

    templatesInFolder1.should.eql(['a', 'b'])
    templatesInFolder4.should.eql(['e'])

    foldersInFolder4.should.eql([])
    foldersInFolder1.should.eql(['folder2'])
  })
})
