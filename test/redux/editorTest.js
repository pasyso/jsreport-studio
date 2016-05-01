import 'should'
import { actions } from '../../src/redux/editor'
import { ActionTypes as EntitiesActionTypes } from '../../src/redux/entities'
import { describeAsyncStore, itAsync } from './asyncStore.js'

describeAsyncStore('editor.actions.openTab', ({ store, api, history }) => {
  itAsync('should add custom tabs collection and activate it', async () => {
    await store.dispatch(actions.openTab({ key: '1' }))
    store.getState().editor.tabs.should.have.length(1)
    store.getState().editor.activeTab.should.be.eql('1')
  })

  itAsync('should load entity if _id supplied', async () => {
    api.get((p) => ({ value: [{ _id: '1' }] }))

    store.getState().entities = { '1': { __entitySet: 'testEntity' } }
    await store.dispatch(actions.openTab({ _id: '1' }))
    history[ EntitiesActionTypes.LOAD ].should.be.ok
  })
})

describeAsyncStore('editor.actions.activateTab', ({ store, api, history }) => {
  itAsync('should update state to new tab key', async () => {
    store.getState().editor.tabs = [ { key: '1' } ]
    await store.dispatch(actions.activateTab('1'))
    store.getState().editor.activeTab.should.be.eql('1')
  })
})