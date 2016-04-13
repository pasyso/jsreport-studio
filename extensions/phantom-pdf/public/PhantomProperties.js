const React = studio.react
const { Component } = studio.react

export default class Properties extends Component {
  openHeaderFooter (type) {
    studio.dispatch(
      studio.editor.actions.openTab({
        key: this.props.entity._id + '_phantom' + type,
        _id: this.props.entity._id,
        headerOrFooter: type,
        detailComponentKey: 'phantom',
        titleComponentKey: 'phantom'
      })
    )
  }

  render () {
    const { entity, entities, onChange } = this.props

    if (entity.__entityType !== 'templates' || entity.recipe !== 'phantom-pdf') {
      return <div></div>
    }

    return (
      <div>
        Phantom settings....
        <div>
          <button onClick={() => this.openHeaderFooter('header')}>open header</button>
          <button onClick={() => this.openHeaderFooter('footer')}>open footer</button>
        </div>
      </div>
    )
  }
}

