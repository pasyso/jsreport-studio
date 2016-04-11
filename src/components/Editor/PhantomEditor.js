import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/handlebars'
import 'brace/theme/chrome'

export default class PhantomEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  resize () {
    this.refs.ace.editor.resize()
  }

  render () {
    const { entity, onUpdate } = this.props
    console.log('here', entity)

    return <AceEditor
      key={entity._id + '_phantom'}
      mode='handlebars'
      theme='chrome'
      ref='ace'
      onChange={(v) => onUpdate(Object.assign({}, entity, {phantom: { header: v }}))}
      name={entity._id + '_phantom'}
      width='100%'
      className='ace'
      value={entity.phantom ? entity.phantom.header : ''}
      editorProps={{$blockScrolling: true}}/>
  }
}