import React, { Component } from 'react'
import style from './EntityTreeBox.scss'

class EntityTreeBox extends Component {
  render () {
    return (
      <div className={style.treeListContainer}>
        {this.props.children}
      </div>
    )
  }
}

export default EntityTreeBox
