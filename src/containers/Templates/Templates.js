import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {list as listAction} from 'redux/modules/templates'
import {Button} from 'react-bootstrap'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/theme/chrome'
import SplitPane from 'react-split-pane'
import style from './Templates.scss'
import preview from './preview'
import { DockPane, DockPanel } from 'dock-spawn'

@connect(
    state => ({
    list: state.templates.list,
    error: state.templates.error,
    loading: state.templates.loading,
    loaded: state.templates.loaded
  }), { listAction })
export default class Templates extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    listAction: PropTypes.func.isRequired
  };

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  componentDidMount () {
    this.props.listAction()
    var self = this;

    this.refs.dockPane.dockManager.addLayoutListener({
      onResumeLayout: function() {
        self.refs.ace.editor.resize()
      }
    })

    //setInterval(function() {
    //  //self.forceUpdate()
    //  self.refs.ace.editor.resize()
    //  console.log(self.refs.ace)
    //}, 5000)
  }

  componentDidUpdate () {
    window.onresize()
  }

  handleClick () {
    preview(this.props.list[ 0 ], 'previewFrame')
  }

  handleContentChange (val) {
    this.props.list[0].content = val
  }

  render () {
    const { list, loaded, error} = this.props
    const template = list.length ? list[ 0 ] : { content: 'loading' }
    return (
      <div>
        <div>
          <Button bsStyle='success' onClick={this.handleClick}>Run-zz {loaded}</Button>
        </div>
        <DockPane ref='dockPane'>
          <DockPanel position='fill' title='template content'>
            <AceEditor ref='ace'
              mode='handlebars'
              onChange={this.handleContentChange}
              theme='chrome'
              width='100%'
              height='100%'
              name='UNIQUE_ID_2'
              value={template.content}
              editorProps={{$blockScrolling: true}}
              />

            <DockPanel position='right' title='preview' ratio={0.5}>
              <div className={style.previewPaneWrap}>
                <iframe name='previewFrame' className={style.previewPane} allowTransparency='true' frameBorder='0' allowFullScreen='true'></iframe>
              </div>
            </DockPanel>

            <DockPanel position='down' title='template helpers' ratio={0.5}>
              <AceEditor
                mode='javascript'
                theme='chrome'
                width='100%'
                height='100%'
                name='UNIQUE_ID_1'
                value={template.helpers}
                editorProps={{$blockScrolling: true}}
                />
            </DockPanel>
          </DockPanel>

        </DockPane>
      </div>
    )
  }
}

