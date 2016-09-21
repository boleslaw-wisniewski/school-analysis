import React from 'react';
import { Link } from 'react-router';

import './shell.scss';

class Shell extends React.Component {

  render() {

    console.log('location', this.props.location);
    console.log('route', this.props.route);

    return (
    <div id="school-analysis">
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">NYC School Comparisons</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/home" activeClassName="active">Home</Link></li>
              <li><Link to="/search" activeClassName="active">Search</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="shell-content">
          {this.props.children}
        </div>
      </div>

    </div>
    )}
}

export default Shell;
