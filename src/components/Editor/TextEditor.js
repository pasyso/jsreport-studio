import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/theme/chrome'

export default class TextEditor extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    mode: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  }

  resize () {
    this.refs.ace.editor.resize()
  }

  componentDidMount () {
    this.refs.ace.editor.renderer.setScrollMargin(5, 0)
  }

  render () {
    const { value, onUpdate, name, mode } = this.props

    return (<AceEditor
      key={name}
      name={name}
      mode={mode}
      theme='chrome'
      ref='ace'
      onChange={(v) => onUpdate(v)}
      className='ace'
      width='100%'
      value={value}
      editorProps={{$blockScrolling: true}}/>)
  }
}