import React, { Component } from 'react'
import Popover from '../../components/common/Popover'
import EntityTreeButton from './EntityTreeButton'
import style from './EntityTreeInputSeach.scss'

class EntityTreeInputSeach extends Component {
  constructor (props) {
    super(props)

    this.state = {
      displayInput: false,
      filterActive: false,
      filterByName: ''
    }

    this.onNameFilterChange = this.onNameFilterChange.bind(this)
  }

  onNameFilterChange (ev) {
    const name = ev.target.value

    this.setState({
      filterActive: Boolean(name),
      filterByName: name
    })

    this.props.setFilter({ name })
  }

  render () {
    const { displayInput, filterActive, filterByName } = this.state

    return (
      <div title='Filter entities tree by name' className={style.container}>
        <EntityTreeButton active={filterActive} onClick={() => this.setState({ displayInput: true })}>
          <span style={{ display: 'inline-block' }}>
            <i className='fa fa-filter' />
            &nbsp;
            <i className='fa fa-font' />
          </span>
        </EntityTreeButton>
        <Popover
          open={displayInput}
          onClose={() => this.setState({ displayInput: false })}
        >
          <div className={style.search}>
            <input type='text' value={filterByName} onChange={this.onNameFilterChange} />
          </div>
        </Popover>
      </div>
    )
  }
}

export default EntityTreeInputSeach
