import React, {Component, PropTypes} from 'react'
import { registerModalHandler } from '../../lib/configuration.js'
import ReactModal from 'react-modal'
import style from './Modal.scss'

export default class Modal extends Component {

  constructor () {
    super()
    this.state = {}
    registerModalHandler(this)
  }

  renderContent () {
    return (<div>{typeof this.componentOrText !== 'string' ? React.createElement(this.componentOrText, {
      close: () => this.close(),
      options: this.options
    }) : this.componentKeyOrText}</div>)
  }

  open (componentOrText, options) {
    this.componentOrText = componentOrText
    this.options = options
    this.setState({ isOpen: true })
  }

  close () {
    this.setState({ isOpen: false })
  }

  render () {
    const { isOpen } = this.state
    return <ReactModal key='ReactModal'
      isOpen={isOpen} overlayClassName={style.overlay} className={style.content}
      onRequestClose={() => this.close()}>
      {isOpen ? this.renderContent() : ''}
    </ReactModal>
  }
}
