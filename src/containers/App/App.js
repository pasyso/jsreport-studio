import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router';

@asyncConnect([{
  promise: ({store: {}}) => {
    return Promise.all([]);
  }
}])
@connect(null, null)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div>
        <Helmet {...config.app.head}/>
        <nav className="navbar navbar-dark bg-primary navbar-fixed-top">
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link active">Home</Link>
            <Link to="/templating" className="nav-item nav-link">Templates</Link>
            <Link to="/data" className="nav-item nav-link">Data</Link>
          </div>
        </nav>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
