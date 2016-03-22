import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {list as listAction} from 'redux/modules/templates';

let AceEditor;

if (typeof window !== 'undefined') {
  AceEditor = require('react-ace');

  require('brace/mode/javascript');
  require('brace/theme/chrome');
}

@connect(
    state => ({
      list: state.templates.list,
      error: state.templates.error,
      loading: state.templates.loading,
      loaded: state.templates.loaded
  }), {listAction})
export default class Templates extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    listAction: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.listAction();
  }

  handleClick() {
    alert('click');
  }

  render() {
    const { list, loaded, error} = this.props;

    return (
      <div>
        <button className="btn btn-success" >Save</button>
        aaa
        {loaded ?
        <div> <AceEditor
          mode="javascript"
          theme="chrome"
          name="UNIQUE_ID_OF_DIV"
          value={list[0].content}
          editorProps={{$blockScrolling: true}}
          /></div>
           : <div>loading</div>}
      </div>
    );
  }
}

