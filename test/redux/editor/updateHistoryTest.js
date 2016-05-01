import 'should'
import { actions } from '../../../src/redux/editor'
import { describeAsyncStore, itAsync } from './../asyncStore.js'

describeAsyncStore('editor.actions.updateHistory', ({ store, api, history }) => {
  itAsync('should push to history routes based on active entity', async () => {
    store.update({
      entities: { '1': { __entitySet: 'testEntity', _id: '1', shortid: 'foo' } },
      editor: { tabs: [{ key: '1', _id: '1', type: 'entity', entitySet: 'testEntity' }], activeTab: '1' },
      routing: { locationBeforeTransitions: { pathname: '/' } }
    })

    await store.dispatch(actions.updateHistory())

    history['@@router/CALL_HISTORY_METHOD'].payload.args.should.containEql('/studio/testEntity/foo')
  })

  itAsync('should push to history only if the route is different', async () => {
    store.update({
      entities: { '1': { __entitySet: 'testEntity', _id: '1', shortid: 'foo' } },
      editor: { tabs: [{ key: '1', _id: '1', type: 'entity', entitySet: 'testEntity' }], activeTab: '1' },
      routing: { locationBeforeTransitions: { pathname: '/studio/testEntity/foo' } }
    })

    await store.dispatch(actions.updateHistory())

    history.should.not.containEql('@@router/CALL_HISTORY_METHOD')
  })
})
