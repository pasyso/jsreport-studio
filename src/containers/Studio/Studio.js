import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { actions, selectors } from 'redux/editor'
import * as entities from 'redux/entities'
import Preview from '../../components/studio/Preview.js'
import EntityTree from '../../components/studio/EntityTree.js'
import Properties from '../../components/studio/Properties.js'
import style from './Studio.scss'
import _debounce from 'lodash/function/debounce'
import preview from '../../helpers/preview'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'
import {TabPane, Tab} from '../../components/common/Tabs/TabPane.js'

@connect((state) => ({
  entities: state.entities,
  references: entities.selectors.getReferences(state),
  tabs: state.editor.tabs,
  activeTab: state.editor.activeTab,
  isSaving: state.editor.isSaving,
  tabsWithEntities: selectors.getTabWithEntities(state),
  activeEntity: selectors.getActiveEntity(state)
}), { ...actions })
export default class Studio extends Component {
  static propTypes = {
    entities: PropTypes.object,
    references: PropTypes.object,
    tabsWithEntities: PropTypes.array,
    currentDetail: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  };

  constructor () {
    super()
    this.handleSplitChanged = _debounce(this.handleSplitChanged, 150, { leading: true })
  }

  componentDidMount () {
  }

  handleRun () {
    let template = Object.assign({}, this.props.activeEntity)
    let request = { template: template }
    studio.onPreview(request, Object.assign({}, this.props.entities))
    preview(request, 'previewFrame')
  }

  handleSplitChanged () {
    if (this.props.activeTab && this.refs[ this.props.activeTab ] && this.refs[ this.props.activeTab ].resize) {
      this.refs[ this.props.activeTab ].resize()
    }

    this.refs.preview.resizeStarted()
  }

  handleSplitDragFinished () {
    // wait for debounce
    setTimeout(() => this.refs.preview.resizeEnded(), 200)
  }

  render () {
    const { tabsWithEntities, references, saveAll, isSaving, activeTab, entities, remove, openTab, activateTab, openNewTab, activeEntity, update, save, closeTab } = this.props

    console.log('render', tabsWithEntities)

    return (
      <div className='block'>
        <div className={style.toolbar}>
          <button onClick={() => this.handleRun()}>Run</button>
          <button onClick={save}>Save {isSaving ? '...' : ''}</button>
          <button onClick={saveAll}>Save All {isSaving ? '...' : ''}</button>
          <button onClick={remove}>Delete</button>
        </div>
        <div className='block'>
          <SplitPane
            resizerClassName='resizer' defaultSize='80%' onChange={() => this.handleSplitChanged()}
            onDragFinished={() => this.handleSplitDragFinished()}>
            <SplitPane resizerClassName='resizer-horizontal' split='horizontal' defaultSize='400px'>
              <EntityTree entities={references} onClick={openTab} onNewClick={openNewTab}/>
              <Properties entity={activeEntity} entities={entities} onChange={(e) => update(e)}/>
            </SplitPane>
            <SplitPane
              onChange={() => this.handleSplitChanged()} onDragFinished={() => this.handleSplitDragFinished()}
              resizerClassName='resizer'>
              <TabPane activeTabKey={activeTab} activateTab={activateTab} closeTab={closeTab}>
                {tabsWithEntities.map((t) =>
                  <Tab key={t._id} title={t.name + (t.__isDirty ? '*' : '')}>
                    {React.createElement(studio.detailComponents[ t.__entityType ], {
                      entity: t,
                      ref: t._id,
                      onUpdate: (o) => update(o)
                    })}
                  </Tab>)}
              </TabPane>
              <Preview ref='preview'/>
            </SplitPane>
          </SplitPane>
        </div>
      </div>
    )
  }
}