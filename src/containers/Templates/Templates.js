import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as objectReferencesActions from 'redux/modules/objectReferences'
import * as editorActions from 'redux/modules/editor'
import * as objectDetailActions from 'redux/modules/objectDetails'
import Preview from '../../components/studio/Preview.js'
import ObjectTree from '../../components/studio/ObjectTree.js'
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
    var self = this
    this.props.fetchObjectReferences().then(function (res) {
      self.props.openTab(res.result[ 0 ]._id)
    })
  }

  handleClick () {
    preview(this.props.details.templates.filter((d) => d._id === this.props.activeTab)[ 0 ], 'previewFrame')
  }

  handleSplitChanged (id) {
    this.props.tabs.forEach((t) => this.refs[ t ].resize())
    document.getElementById('overlay').style.display = 'block'
    document.getElementById('preview').style.display = 'none'
  }

  handleSplitDragFinished (id) {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('preview').style.display = 'block'
  }

  handleContentChange (id, val) {
    this.props.updateTemplateContent(id, val)
  }

  render () {
    const { references, tabs, activeTab, openTab, details, updateTemplateContent, closeTab } = this.props

    const tabsWithDetails = tabs.map((t) => details.templates.filter((d) => d._id === t)[ 0 ])

    return (
      <div className='block'>
        <div className={style.toolbar}>
          <button onClick={() => this.handleClick()}>Run</button>
        </div>
        <div className='block'>
          <SplitPane resizerClassName={style.resizer} defaultSize='90%'>
            <SplitPane resizerClassName={style.resizerHorizontal} split='horizontal' defaultSize='50%'>
              <ObjectTree objects={references} onClick={openTab}/>
              <div className={style.properties + ' block-item'}>Properties</div>
            </SplitPane>
            <SplitPane
              onChange={() => this.handleSplitChanged()} onDragFinished={() => this.handleSplitDragFinished()}
              resizerClassName={style.resizer}>
              <TabPane activeTabKey={activeTab} activateTab={openTab} closeTab={closeTab}>
                {tabsWithDetails.map((t) =>
                  <Tab key={t._id} title={t.name}>
                    <TextEditor
                      object={t} ref={t._id} className={style.ace} onUpdate={(v) => updateTemplateContent(t._id, v)}/>
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

