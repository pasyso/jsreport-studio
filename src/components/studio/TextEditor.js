import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/theme/chrome'

export default class TextEditor extends Component {
  static propTypes = {
    object: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  resize () {
    this.refs.ace.editor.resize()
  }

  render () {
    const { object, className, onUpdate } = this.props

    return (<AceEditor
      key={object._id}
      mode='handlebars'
      theme='chrome'
      ref='ace'
      onChange={(v) => onUpdate(Object.assign({}, object, {content: v}))}
      name={object._id}
      width='100%'
      className={className}
      value={object.content}
      editorProps={{$blockScrolling: true}}/>)
  }
}