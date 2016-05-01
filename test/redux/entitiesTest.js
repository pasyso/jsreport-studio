import should from 'should'
import * as actions from '../../src/redux/entities/actions.js'
import { describeAsyncStore, itAsync } from './asyncStore.js'

describeAsyncStore('entities.actions.loadReference', ({ store, api }) => {
  itAsync('should hash results by _id into the state', async () => {
    api.get((p) => ({ value: [{ _id: '1' }, { _id: '2' }] }))

    await store.dispatch(actions.loadReferences('testEntity'))
    store.getState().entities['1']._id.should.be.eql('1')
    store.getState().entities['2']._id.should.be.eql('2')
  })

  itAsync('should add __entitySet __isLoad=false', async () => {
    api.get((p) => ({ value: [{ _id: '1' }] }))

    await store.dispatch(actions.loadReferences('testEntity'))
    store.getState().entities['1'].__entitySet.should.be.eql('testEntity')
    should(store.getState().entities['1'].__isLoad).not.be.ok
  })
})

describeAsyncStore('entities.actions.load', async ({ store, api }) => {
  itAsync('should request API and update state with entity', async () => {
    store.getState().entities = { '1': { __entitySet: 'testEntity' } }
    api.get((p) => ({ value: [{ _id: '1', name: 'foo' }] }))

    await store.dispatch(actions.load('1'))
    store.getState().entities['1'].name.should.be.eql('foo')
  })

  itAsync('should not request API if already loaded', async () => {
    store.getState().entities = { '1': { __isLoaded: true, __entitySet: 'testEntity' } }
    let called = false
    api.get((p) => (called = true))

    await store.dispatch(actions.load('1'))
    called.should.be.eql.false
  })

  itAsync('should not request API if already entity is new - not yet persisted', async () => {
    store.getState().entities = { '1': { __isNew: true, __entitySet: 'testEntity' } }
    let called = false
    api.get((p) => (called = true))

    await store.dispatch(actions.load('1'))
    called.should.be.eql.false
  })
})