const React = studio.react
const { Component } = studio.react

export default class Properties extends Component {

  openHeader () {
    studio.dispatch(
      studio.editor.actions.openTab({
        key: this.props.entity._id + '_phantom',
        _id: this.props.entity._id,
        detailComponentKey: 'phantom',
        title: 'Phantom'
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
          <button onClick={() => this.openHeader()}>open header</button>
        </div>
      </div>
    )
  }
}

