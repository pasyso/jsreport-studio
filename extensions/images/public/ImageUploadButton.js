const React = Studio.react
const ReactDom = Studio.ReactDom
const { Component } = Studio.react
import superagent from 'superagent'

let _imageUploadButton

export default class ImageUploadButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  static OpenUpload () {
    console.trace('here')
    _imageUploadButton.openFileDialog(true)
  }

  componentDidMount () {
    _imageUploadButton = this
  }

  upload (e) {
    console.log('there', this.forNew)
    if (!e.target.files.length) {
      return
    }

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      if (this.forNew) {
        superagent.post('/api/image')
          .attach('file.png', file)
          .end((err, res) => {
            if (err) {
              return alert('Uploading image failed.')
            }

            const response = JSON.parse(res.text)
            const entity = {
              __entitySet: 'images',
              _id: response._id,
              name: response.name,
              shortid: response.shortid
            }
            Studio.addExistingEntity(entity)
            Studio.openTab(Object.assign({}, entity))
          })
      } else {
        superagent.post('/api/image/' + this.props.tab.entity.shortid)
          .attach('file.png', file)
          .end((err, res) => {
            if (err) {
              return alert('Uploading image failed.')
            }

            Studio.reloadEntity(this.props.tab.entity._id)
          })
      }
    }

    reader.onerror = function () {
      alert('There was an error reading the file!')
    }

    reader.readAsBinaryString(file)
  }

  openFileDialog (forNew) {
    this.forNew = forNew

    this.refs.file.dispatchEvent(new MouseEvent('click', {
      'view': window,
      'bubbles': false,
      'cancelable': true
    }))
  }

  renderUpload () {
    return <input
      type='file' key='file' ref='file' style={{display: 'none'}} onChange={(e) => this.upload(e)}
      accept='image/*'></input>
  }

  render () {
    if (!this.props.tab || !this.props.tab.entity || this.props.tab.entity.__entitySet !== 'images') {
      return this.renderUpload(true)
    }

    return <div className='toolbar-button' onClick={() => { console.log('ups'); this.openFileDialog() }}>
      <i className='fa fa-cloud-upload'/>Upload
      {this.renderUpload()}
    </div>
  }
}

