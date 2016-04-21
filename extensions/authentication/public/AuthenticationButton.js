import style from './Authentication.scss'
const React = Studio.react
const ReactDom = Studio.ReactDom
const { Component } = Studio.react

export default class ReportsButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = {}
    this.tryHide = this.tryHide.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.tryHide)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.tryHide)
  }

  tryHide () {
    if (this.state.expanded) {
      this.setState({ expanded: false })
    }
  }

  render () {
    const { expanded } = this.state

    return <div>
      <div
        className='toolbar-button'
        onClick={(e) => { e.stopPropagation(); this.setState({ expanded: !this.state.expanded }) }}>
        <i className='fa fa-user'/>
      </div>
      <div className={style.popup} style={{display: expanded ? 'block' : 'none'}}>
        <form method='POST' action='/logout'>
          <input ref='logout' type='submit' id='logoutBtn' style={{display: 'none'}}/>
        </form>

        <div>
          <a id='logoutLink' onClick={() => this.refs.logout.click()} style={{cursor: 'pointer'}}><i
            className='fa fa-power-off'></i>
            Logout
          </a>
        </div>

        {Studio.authentication.user.isAdmin ? '' : <div>
          <a
            id='changePassword'
            onClick={() => Studio.openModal('CHANGE_PASSWORD_MODAL', { entity: Studio.authentication.user })}
            style={{cursor: 'pointer'}}><i className='fa fa-key'></i>
            Change password
          </a>
        </div>
        }
      </div>
    </div>
  }
}

