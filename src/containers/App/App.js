import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import config from '../../config'
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
        <Helmet {...config.app.head}/>
        <nav className={style.navbar}>
          <Link to='/' className={style['nav-link']}>Home</Link>
          <Link to='/studio/templating' className={style['nav-link']}>Templates</Link>
          <Link to='/studio/data' className={style['nav-link']}>Data</Link>
          <Link to='/studio/scripts' className={style['nav-link']}>Scripts</Link>
        </nav>

        <div className={style.appContent + ' container'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
