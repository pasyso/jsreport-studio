import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from 'redux/modules/studio'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/theme/chrome'
import style from './Templates.scss'
import preview from './preview'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'
import {TabPane, Tab} from '../../components/common/Tabs/TabPane.js'

@connect((state) => ({
  list: state.studio.templateList,
  details: state.studio.templateDetails,
  currentDetail: state.studio.currentDetail
}), actions)
export default class Templates extends Component {
  static propTypes = {
    list: PropTypes.array,
    details: PropTypes.array,
    currentDetail: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  };

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSplitChanged = this.handleSplitChanged.bind(this)
    this.handleSplitDragFinished = this.handleSplitDragFinished.bind(this)
  }

  componentDidMount () {
    this.props.fetchTemplateNames()
  }

  handleClick () {
    preview(this.props.currentDetail, 'previewFrame')
  }

  openTab (id) {
    this.props.fetchTemplate(id)
  }

  activateTab (id) {
    this.props.fetchTemplate(id)
  }

  handleSplitChanged (id) {
    this.refs.ace.editor.resize()
    document.getElementById('overlay').style.display = 'block'
    document.getElementById('preview').style.display = 'none'
  }

  handleSplitDragFinished (id) {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('preview').style.display = 'block'
  }

  handleContentChange (val) {
    this.props.currentDetail.content = val
  }

  render () {
    const {currentDetail, list, details, fetchTemplate, closeTemplate } = this.props

    if (!currentDetail) {
      return <div></div>
    }

    return (
      <div className='block'>
        <div className={style.toolbar}>
          <button onClick={this.handleClick}>Run</button>
          {list.map((l) =>
            <button key={l._id} onClick={() => this.openTab(l._id)}>{l.name}
            </button>)
          }
        </div>
        <div className='block'>
          <SplitPane
            onChange={this.handleSplitChanged} onDragFinished={this.handleSplitDragFinished}
            resizerClassName={style.resizer}>
            <TabPane
              activeTabKey={currentDetail._id} activateTab={fetchTemplate} closeTab={closeTemplate}>
              {details.map((t) =>
                <Tab key={t._id} title={t.name}>
                  <AceEditor
                    key={t._id}
                    ref='ace'
                    mode='javascript'
                    theme='chrome'
                    name={t._id}
                    width='100%'
                    className={style.ace}
                    value={t.content}
                    editorProps={{$blockScrolling: true}}/>
                </Tab>)
              }
            </TabPane>

            <div className='block'>
              <div id='overlay' style={{display: 'none'}}></div>
              <iframe
                id='preview' frameBorder='0' name='previewFrame' allowTransparency='true' allowFullScreen='true'
                className='block-item'></iframe>
            </div>
          </SplitPane>
        </div>
      </div>
    )
  }
}

