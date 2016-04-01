import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { fetchTemplateNames, fetchTemplate } from 'redux/modules/studio'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/theme/chrome'
import style from './Templates.scss'
import preview from './preview'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'

@connect((state) => ({
  list: state.studio.templateList,
  details: state.studio.templateDetails,
  currentDetail: state.studio.currentDetail
}), { fetchTemplateNames, fetchTemplate })
export default class Templates extends Component {
  static propTypes = {
    list: PropTypes.array,
    details: PropTypes.array,
    currentDetail: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    fetchTemplateNames: PropTypes.func.isRequired,
    fetchTemplate: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleDetail = this.handleDetail.bind(this)
    this.handleSplitChanged = this.handleSplitChanged.bind(this)
    this.handleSplitDragFinished = this.handleSplitDragFinished.bind(this)
  }

  componentDidMount () {
    this.props.fetchTemplateNames()
  }

  handleClick () {
    preview(this.props.currentDetail, 'previewFrame')
  }

  handleDetail (id) {
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
    const {currentDetail, list} = this.props

    if (!currentDetail) {
      return <div></div>
    }

    return (
      <div className={style.studioContainer}>
        <div className={style.toolbar}>
          <button onClick={this.handleClick}>Run</button>
          {list.map((l) =>
            <button key={l._id} onClick={() => this.handleDetail(l._id)}>{l.name}
            </button>)
          }
        </div>
        <div className={style.main}>
          <SplitPane defaultSize='50%' onChange={this.handleSplitChanged} onDragFinished={this.handleSplitDragFinished}
            resizerClassName={style.resizer}>
            <AceEditor
              ref='ace'
              mode='javascript'
              theme='chrome'
              name='UNIQUE_ID_OF_DIV'
              width='100%'
              className={style.ace}
              value={currentDetail.content}
              editorProps={{$blockScrolling: true}}/>

            <div style={{flex: 1, display: 'flex'}}>
              <div id='overlay' style={{display: 'none'}}></div>
              <iframe id='preview' frameBorder='0' name='previewFrame' src='http://www.pdf995.com/samples/pdf.pdf'
                      allowTransparency='true' allowFullScreen='true' style={{width: '100%', flex: 1}}></iframe>
            </div>
          </SplitPane>
        </div>
      </div>
    )
  }
}

