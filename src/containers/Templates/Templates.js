import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {list as listAction} from 'redux/modules/templates';
import {Button} from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/handlebars';
import 'brace/theme/chrome';
import SplitPane from 'react-split-pane';
import style from './Templates.scss';
import preview from './preview';


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
    preview(this.props.list[0], 'previewFrame');
  }

  render() {
    const { list, loaded, error} = this.props;

    return (
      <div>
        <Button bsStyle="success" onClick={() => this.handleClick()}>Runxab</Button>
        <SplitPane split="vertical" minSize="50" defaultSize="50%">
           <AceEditor
              mode="javascript"
              theme="chrome"
              name="UNIQUE_ID_OF_DIV"
              width="100%"
              height="100%"
              value={loaded ? list[0].content : 'loading...'}
              editorProps={{$blockScrolling: true}}/>
          <div className={style.previewPane}><iframe frameBorder="0" name="previewFrame" allowTransparency="true" allowFullScreen="true" style={{width: '100%', height: '100%'}}></iframe></div>
        </SplitPane>
      </div>
    );
  }
}

