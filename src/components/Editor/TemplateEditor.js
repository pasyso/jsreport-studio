import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/mode/javascript'
import 'brace/theme/chrome'
import 'brace/theme/chrome'
import 'brace/ext/searchbox'
import _debounce from 'lodash/debounce'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'

export default class TemplateEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.handleSplitChanged = _debounce(this.handleSplitChanged, 150, { leading: true })
  }

  resize () {
    this.refs.ace.editor.resize()
    this.refs.aceHelpers.editor.resize()
  }

  componentDidUpdate () {
    this.refs.ace.editor.renderer.setScrollMargin(5, 0)
  }

  handleSplitChanged () {
    this.resize()
  }

  render () {
    const { entity, onUpdate } = this.props

    return (
      <SplitPane split='horizontal' resizerClassName='resizer-horizontal' onChange={() => this.handleSplitChanged()}
                 defaultSize='400px'>
        <AceEditor
          key={entity._id}
          mode='handlebars'
          theme='chrome'
          ref='ace'
          onChange={(v) => onUpdate(Object.assign({}, entity, {content: v}))}
          name={entity._id}
          width='100%'
          className='ace'
          value={entity.content}
          editorProps={{$blockScrolling: true}}/>
        <AceEditor
          key={entity._id + '_helpers'}
          mode='javascript'
          theme='chrome'
          ref='aceHelpers'
          onChange={(v) => onUpdate(Object.assign({}, entity, {helpers: v}))}
          name={entity._id + '_helpers'}
          width='100%'
          className='ace'
          value={entity.helpers}
          editorProps={{$blockScrolling: true}}/>
      </SplitPane>
    )
  }
}