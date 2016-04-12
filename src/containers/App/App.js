import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import style from './App.scss'

@connect(null, null)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='container'>
        <Helmet/>
        <div className={style.appContent + ' container'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
