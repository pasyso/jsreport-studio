import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from 'redux/modal/actions'
import Studio from '../../Studio.js'
import ReactModal from 'react-modal'
import style from './Modal.scss'

@connect((state) => ({
  isOpen: state.modal.isOpen,
  text: state.modal.text,
  componentKey: state.modal.componentKey,
  options: state.modal.options
}), { ...actions })
export default class Modal extends Component {

  renderContent () {
    const { text, componentKey, close, options } = this.props
    return (<div>{!componentKey ? text : React.createElement(Studio.modals[componentKey], {
      close: close,
      options: options
    })
    }</div>)
  }

  render () {
    const { isOpen, close } = this.props
    return <ReactModal key='foo'
      isOpen={isOpen} overlayClassName={style.overlay} className={style.content}
      onRequestClose={close}>
      {isOpen ? this.renderContent() : ''}
    </ReactModal>
  }
}
