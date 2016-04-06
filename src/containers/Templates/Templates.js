import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as objectReferencesActions from 'redux/modules/objectReferences'
import * as editorActions from 'redux/modules/editor'
import * as objectDetailActions from 'redux/modules/objectDetails'
import Preview from '../../components/studio/Preview.js'
import ObjectTree from '../../components/studio/ObjectTree.js'
import Properties from '../../components/studio/Properties.js'
import TextEditor from '../../components/studio/TextEditor.js'
import style from './Templates.scss'
import preview from './preview'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'
import {TabPane, Tab} from '../../components/common/Tabs/TabPane.js'

@connect((state) => ({
  references: state.objectReferences,
  details: state.objectDetails,
  tabs: state.editor.tabs,
  activeTab: state.editor.activeTab
}), { ...objectReferencesActions, ...editorActions, ...objectDetailActions })
export default class Templates extends Component {
  static propTypes = {
    references: PropTypes.object,
    details: PropTypes.object,
    currentDetail: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  };

  componentDidMount () {
  }

  handleRun () {
    let activeTemplates = this.props.details.templates.filter((d) => d._id === this.props.activeTab)
    if (!activeTemplates.length) {
      activeTemplates = this.props.details.templates
    }

    let template = Object.assign({}, activeTemplates[ 0 ])
    let request = { template: template }
    studio.onPreview(request, Object.assign({}, this.props.details))
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
    const { references, tabs, activeTab, openTab, activateTab, openNewTab, details, update, save, closeTab } = this.props

    const currentTab = activeTab ? tabs.filter((t) => t._id === activeTab)[ 0 ] : null
    const currentObject = currentTab ? this.props.details[ currentTab.objectType ].filter((o) => o._id === currentTab._id)[ 0 ] : null

    const tabsWithDetails = tabs.map((t) => Object.assign({}, t, details[ t.objectType ].filter((d) => d._id === t._id)[ 0 ]))

    return (
      <div className='block'>
        <div className={style.toolbar}>
          <button onClick={() => this.handleRun()}>Run</button>
          <button onClick={save}>Save</button>
        </div>
        <div className='block'>
          <SplitPane resizerClassName={style.resizer} defaultSize='80%'>
            <SplitPane resizerClassName={style.resizerHorizontal} split='horizontal' defaultSize='400px'>
              <ObjectTree objects={references} onClick={openTab} onNewClick={openNewTab}/>
              <Properties object={currentObject}/>
            </SplitPane>
            <SplitPane
              onChange={() => this.handleSplitChanged()} onDragFinished={() => this.handleSplitDragFinished()}
              resizerClassName={style.resizer}>
              <TabPane activeTabKey={activeTab} activateTab={activateTab} closeTab={closeTab}>
                {tabsWithDetails.map((t) =>
                  <Tab key={t._id} title={t.name}>
                    {t.objectType === 'templates' ? <TextEditor
                      object={t} ref={t._id} className={style.ace}
                      onUpdate={(o) => update(t.objectType, o)}/>
                      : React.createElement(studio.detailComponents[ t.objectType ], {
                      object: t,
                      onUpdate: (o) => update(t.objectType, o)
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

