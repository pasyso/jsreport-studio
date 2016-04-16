const React = Studio.react
const TextEditor = Studio.TextEditor
const { Component } = Studio.react

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    tab: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  resize () {
    this.refs.ace.resize()
  }

  render () {
    const { entity, onUpdate, tab } = this.props

    console.log(entity)

    return (<TextEditor
      name={entity._id + '_phantom' + tab.headerOrFooter}
      mode='handlebars'
      ref='ace'
      value={entity.phantom ? entity.phantom[tab.headerOrFooter] : ''}
      onUpdate={(v) => onUpdate(Object.assign({}, entity, { phantom: Object.assign({}, entity.phantom, { [tab.headerOrFooter]: v }) }))}
      />)
  }
}

