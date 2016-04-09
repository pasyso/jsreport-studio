import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as editor from 'redux/modules/editor'
import * as entities from 'redux/modules/entities'
import Preview from '../../components/studio/Preview.js'
import ObjectTree from '../../components/studio/ObjectTree.js'
import Properties from '../../components/studio/Properties.js'
import TextEditor from '../../components/studio/TextEditor.js'
import style from './Studio.scss'
import preview from '../../helpers/preview'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'
import {TabPane, Tab} from '../../components/common/Tabs/TabPane.js'

@connect((state) => ({
  entities: state.entities,
  references: entities.getReferences(state),
  tabs: state.editor.tabs,
  activeTab: state.editor.activeTab,
  tabsWithEntities: editor.getTabWithEntities(state),
  activeEntity: editor.getActiveEntity(state)
}), { ...editor })
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

  componentDidMount () {
  }

  handleRun () {
    let template = Object.assign({}, this.props.activeEntity)
    let request = { template: template }
    studio.onPreview(request, Object.assign({}, this.props.entities))
    preview(request, 'previewFrame')
  }

  handleSplitChanged (id) {
    this.props.tabs.forEach((t) => this.refs[ t._id ].resize())
    document.getElementById('overlay').style.display = 'block'
    document.getElementById('preview').style.display = 'none'
  }

  handleSplitDragFinished (id) {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('preview').style.display = 'block'
  }

  render () {
    const { tabsWithEntities, references, activeTab, entities, remove, openTab, activateTab, openNewTab, activeEntity, update, save, closeTab } = this.props

    console.log('render', tabsWithEntities)

    return (
      <div className='block'>
        <div className={style.toolbar}>
          <button onClick={() => this.handleRun()}>Run</button>
          <button onClick={save}>Save</button>
          <button onClick={remove}>Delete</button>
        </div>
        <div className='block'>
          <SplitPane resizerClassName={style.resizer} defaultSize='80%'>
            <SplitPane resizerClassName={style.resizerHorizontal} split='horizontal' defaultSize='400px'>
              <ObjectTree entities={references} onClick={openTab} onNewClick={openNewTab}/>
              <Properties entity={activeEntity} entities={entities} onChange={(e) => update(e)}/>
            </SplitPane>
            <SplitPane
              onChange={() => this.handleSplitChanged()} onDragFinished={() => this.handleSplitDragFinished()}
              resizerClassName={style.resizer}>
              <TabPane activeTabKey={activeTab} activateTab={activateTab} closeTab={closeTab}>
                {tabsWithEntities.map((t) =>
                  <Tab key={t._id} title={t.name + (t.__isDirty ? ' (!) ' : '')}>
                    {t.__entityType === 'templates' ? <TextEditor
                      object={t} ref={t._id} className={style.ace}
                      onUpdate={(o) => update(o)}/>
                      : React.createElement(studio.detailComponents[ t.__entityType ], {
                      object: t,
                      onUpdate: (o) => update(o)
                    })}
                  </Tab>)
                }
              </TabPane>
              <Preview/>
            </SplitPane>
          </SplitPane>
        </div>
      </div>
    )
  }
}

