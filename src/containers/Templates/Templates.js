import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {list as listAction} from 'redux/modules/templates';
// import { asyncConnect } from 'redux-async-connect';

/*
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch}}) => dispatch(listAction())
}]) */
@connect(
    state => ({
      list: state.templates.list,
      error: state.templates.error,
      loading: state.templates.loading
    }), { listAction })
export default class Templates extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    listAction: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.listAction();
  }

  render() {
    const { list, error} = this.props;

    return (
      <div>
        <div>
           aaa 22233aarrrzzz
        </div>
        <div>
          { list.map((t) => <span key={t._id}>Template: {t.name}</span>)}
        </div>
        Templates
      </div>
    );
  }
}

