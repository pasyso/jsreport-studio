import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { fetchTemplateNames, fetchTemplate } from 'redux/modules/studio'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/theme/chrome'
import style from './Templates.scss'
import preview from './preview'
import SplitPane from 'react-split-pane'

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
  }

  componentDidMount () {
    this.props.fetchTemplateNames()
    var self = this

    //if (this.refs.dockPane) {
    //  this.refs.dockPane.dockManager.addLayoutListener({
    //    onResumeLayout: function () {
    //      self.refs.aceContent.editor.resize()
    //      self.refs.aceHelpers.editor.resize()
    //    }
    //  })
    //}
  }

  handleClick () {
    preview(this.props.currentDetail, 'previewFrame')
  }

  handleDetail (id) {
    this.props.fetchTemplate(id)
  }

  handleContentChange (val) {
    this.props.currentDetail.content = val
  }

  render () {

    const { currentDetail, list} = this.props

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
          <div className={style.editor}>
            <AceEditor
              mode='javascript'
              theme='chrome'
              name='UNIQUE_ID_OF_DIV'
              width='100%'
              className={style.ace}
              value={currentDetail.content}
              editorProps={{$blockScrolling: true}}/>
          </div>
          <div className={style.preview}>
            <iframe id='iframe' style={{width:'100%', height:'100%', flex: 1}} allowTransparency='true' frameBorder='0'
                    allowFullScreen='true' src="http://www.pdf995.com/samples/pdf.pdf"></iframe>
          </div>
        </div>
      </div>
    )
  }
}

