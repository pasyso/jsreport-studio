const React = studio.react
const AceEditor = studio.AceEditor
const { Component } = studio.react

export default class DataEditor extends Component {
  static propTypes = {
    object: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  resize () {
    this.refs.ace.editor.resize()
  }

  render () {
    const { object, onUpdate } = this.props

    return (<AceEditor
      key={object._id}
      mode='javascript'
      theme='chrome'
      ref='ace'
      name={object._id}
      width='100%'
      value={object.dataJson}
      onChange={(v) => onUpdate(Object.assign({}, object, {dataJson: v}))}
      editorProps={{$blockScrolling: true}}/>)
  }
}

