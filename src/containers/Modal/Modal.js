import React, {Component, PropTypes} from 'react'
import Studio from '../../Studio.js'
import ReactModal from 'react-modal'
import style from './Modal.scss'

//@connect((state) => ({
//  isOpen: state.modal.isOpen,
//  text: state.modal.text,
//  componentKey: state.modal.componentKey,
//  options: state.modal.options
//}), { ...actions })
export default class Modal extends Component {

  constructor () {
    super()
    this.state = {}
    Studio.registerModalSubscriber(this)
  }

  renderContent () {
    const component = Studio.modals[this.componentKeyOrText]

    return (<div>{component ? React.createElement(component, {
      close: () => this.close(),
      options: this.options
    }) : this.componentKeyOrText}</div>)
  }

  open (componentKeyOrText, options) {
    this.componentKeyOrText = componentKeyOrText
    this.options = options
    this.setState({ isOpen: true })
  }

  close () {
    this.setState({ isOpen: false })
  }

  render () {
    const { isOpen } = this.state
    return <ReactModal key='foo'
      isOpen={isOpen} overlayClassName={style.overlay} className={style.content}
      onRequestClose={() => this.close()}>
      {isOpen ? this.renderContent() : ''}
    </ReactModal>
  }
}
