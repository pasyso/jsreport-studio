import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from 'redux/modal/actions'
import Studio from '../../Studio.js'
import ReactModal from 'react-modal'
import style from './Modal.scss'

//ReactModal.defaultStyles = {
//  overlay: {
//    position: 'fixed',
//    width: '100%',
//    height: '100%',
//    visibility: 'hidden',
//    top: 0,
//    left: 0,
//    opacity: 0,
//    background: 'red',
//    zIndex: 1000
//  },
//  content: {
//    position: 'fixed',
//    zIndex: 2000,
//    top: '50%',
//    left: '50%',
//    width: '50%',
//    transform: 'translateX(-50%) translateY(-50%)'
//  }
//}

@connect((state) => ({
  isOpen: state.modal.isOpen,
  text: state.modal.text,
  componentKey: state.modal.componentKey,
  options: state.modal.options
}), { ...actions })

export default class Modal extends Component {
  render () {
    const { isOpen, text, componentKey, close, options } = this.props

    return <ReactModal
      isOpen={isOpen} overlayClassName={style.overlay} className={style.content}
      onRequestClose={close}>
      {componentKey ? React.createElement(Studio.modals[componentKey], {
        close: close,
        options: options
      }) : text}
    </ReactModal>
  }
}
