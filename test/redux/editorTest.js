import 'should'
import { actions } from '../../src/redux/editor'
import { ActionTypes as EntitiesActionTypes } from '../../src/redux/entities'
import { describeAsyncStore, itAsync } from './asyncStore.js'

describeAsyncStore('editor.actions.openTab', ({ store, api, history }) => {
  itAsync('should add custom tabs collection and activate it', async () => {
    await store.dispatchAsync(actions.openTab({ key: '1' }))
    store.getState().editor.tabs.should.have.length(1)
    store.getState().editor.activeTab.should.be.eql('1')
  })

  itAsync('should load entity if _id supplied', async () => {
    store.getState().entities = { '1': { __isLoaded: true } }
    await store.dispatchAsync(actions.openTab({ _id: '1' }))
    history[ EntitiesActionTypes.LOAD ].should.be.ok
  })
})

describeAsyncStore('editor.actions.activateTab', ({ store, api, history }) => {
  itAsync('should udate state to new tab key', async () => {
    store.getState().editor.tabs = [ { key: '1' } ]
    await store.dispatchAsync(actions.activateTab('1'))
    store.getState().editor.activeTab.should.be.eql('1')
  })
})