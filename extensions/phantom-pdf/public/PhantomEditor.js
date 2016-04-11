const React = studio.react
const AceEditor = studio.AceEditor
const { Component } = studio.react

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  resize () {
    this.refs.ace.editor.resize()
  }

  render () {
    const { entity, onUpdate } = this.props

    return (<AceEditor
      key={entity._id + '_phantom'}
      mode='handlebars'
      theme='chrome'
      ref='ace'
      name={entity._id + '_phantom'}
      width='100%'
      className='ace'
      value={entity.phantom ? entity.phantom.header : ''}
      onChange={(v) => onUpdate(Object.assign({}, entity, { phantom: { header: v } }))}
      editorProps={{$blockScrolling: true}}/>)
  }
}

