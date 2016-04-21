import style from './Authentication.scss'
const React = Studio.react
const ReactDom = Studio.ReactDom
const { Component } = Studio.react

export default class ChangePasswordButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  render () {
    if (!this.props.tab || !this.props.tab.entity || this.props.tab.entity.__entitySet !== 'users') {
      return <div/>
    }

    return <div>
      <div
        className='toolbar-button'
        onClick={(e) => Studio.openModal('CHANGE_PASSWORD_MODAL', { entity: this.props.tab.entity })}>
        <i className='fa fa-key'/> Change Password
      </div>
    </div>
  }
}

