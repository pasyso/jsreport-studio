import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class Home extends Component {
  render () {
    return (
      <div>
        <Helmet title='Home'/>

        <h1>Home.zzz </h1>
        a<i className='fa fa-camera-retro fa-5x'></i>b
        <button type='button' className='btn btn-default'>Default</button>
        <p>Hm this works!</p>
      </div>
    )
  }
}
