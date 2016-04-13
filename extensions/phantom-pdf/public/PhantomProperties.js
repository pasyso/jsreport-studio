import * as Constants from './constants.js'

const React = Studio.react
const { Component } = Studio.react

export default class Properties extends Component {
  openHeaderFooter (type) {
    Studio.openTab({
      key: this.props.entity._id + '_phantom' + type,
      _id: this.props.entity._id,
      headerOrFooter: type,
      editorComponentKey: Constants.PHANTOM_TAB_EDITOR,
      titleComponentKey: Constants.PHANTOM_TAB_TITLE
    })
  }

  render () {
    const { entity, onChange } = this.props
    const phantom = entity.phantom || {}

    const changePhantom = (change) => onChange(Object.assign({}, entity, { phantom: Object.assign({}, entity.phantom, change) }))

    if (entity.__entityType !== 'templates' || entity.recipe !== 'phantom-pdf') {
      return <div></div>
    }

    return (
      <div>
        Phantom settings....
        <div>
          <div>margin: <input type='text' placeholder='1cm' value={phantom.margin || ''} onChange={(v) => changePhantom({margin: v.target.value})}/></div>
          <button onClick={() => this.openHeaderFooter('header')}>open header</button>
          <button onClick={() => this.openHeaderFooter('footer')}>open footer</button>
        </div>
      </div>
    )
  }
}

