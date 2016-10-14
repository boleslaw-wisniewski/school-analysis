import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getStarredSchools } from '../../modules/school/school.store';

import './shell.scss';

class Shell extends React.Component {

  render() {

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
              <li><Link to="/starred" activeClassName="active">
                <div className="favorites">
                  <span>Favorites</span>
                  <span className="favorites-count">{this.props.getStarCount()}</span>
                </div>
              </Link></li>
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

function connectState(state) {
  return {
    getStarCount: () => getStarredSchools(state.school).length
  };
}
export default connect(connectState)(Shell);
