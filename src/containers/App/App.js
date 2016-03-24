import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from '../../config';
import { Link } from 'react-router';

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
            <Link to="/studio/templating" className="nav-item nav-link">Templates</Link>
            <Link to="/studio/data" className="nav-item nav-link">Data</Link>
            <Link to="/studio/scripts" className="nav-item nav-link">Scripts</Link>
          </div>
        </nav>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
