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

  componentDidMount () {
    this.props.listAction()
  }

  componentDidUpdate () {
    window.onresize()
  }

  handleClick () {
    preview(this.props.list[ 0 ], 'previewFrame')
  }

  render () {
    const { list, loaded, error} = this.props
    const template = list.length ? list[ 0 ] : { content: 'loading' }
    return (
      <div>
        <div>
          <Button bsStyle='success' onClick={() => this.handleClick()}>Run-zz {loaded}</Button>
        </div>
        <DockPane>
          <DockPanel position='fill'>
            <AceEditor
              mode='handlebars'
              theme='chrome'
              width='100%'
              height='100%'
              name='UNIQUE_ID_OF_DIV'
              value={template.content}
              $blockScrolling='Infinity'
              />
          </DockPanel>
          <DockPanel position='right'>
            <div className={style.previewPaneWrap}>
              <iframe id="iframe" name='previewFrame' className={style.previewPane} allowTransparency='true'
                      frameBorder='0' allowFullScreen='true'></iframe>
            </div>
          </DockPanel>
        </DockPane>
      </div>
    )
  }
}

