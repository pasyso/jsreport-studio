const React = Studio.react
const AceEditor = Studio.AceEditor
const { Component } = Studio.react

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    tab: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  resize () {
    this.refs.ace.editor.resize()
  }

  render () {
    const { entity, onUpdate, tab } = this.props

    return (<AceEditor
      key={entity._id + '_phantom' + tab.headerOrFooter}
      mode='handlebars'
      theme='chrome'
      ref='ace'
      name={entity._id + '_phantom' + tab.headerOrFooter}
      width='100%'
      className='ace'
      value={entity.phantom ? entity.phantom[tab.headerOrFooter] : ''}
      onChange={(v) => onUpdate(Object.assign({}, entity, { phantom: Object.assign({}, entity.phantom, { [tab.headerOrFooter]: v }) }))}
      editorProps={{$blockScrolling: true}}/>)
  }
}

