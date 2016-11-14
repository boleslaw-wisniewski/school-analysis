import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import D3Chart from 'modules/charts/D3Chart';
import demoGraphicPieChart from 'modules/charts/demographic/PieChart';
import performanceChart from 'modules/charts/performance/StackedBarGraph';
import { getYearAvgPerformance } from 'modules/charts/performance/performance.service';

import { getStarredSchools, unselectSchoolAction, starSchoolAction, unstarSchoolAction } from '../../school.store';
import { starSchool, unstarSchool } from '../../school.service';

import './schooldetails.scss';

class SchoolDetails extends Component {

  renderGrades(grades) {
    return `${grades[0]} to ${grades[grades.length-1]}`;
  }

  renderAddress(address) {
    return (
      <div>
        <div>{address.street}</div>
        <span>{address.city}</span><span>, {address.zip}</span>
      </div>
    );
  }

  renderPerformance() {
    console.log('perf', this.props.details)
    if (!this.props.details.performance) {
      return;
    }

    const data = getYearAvgPerformance(this.props.details);

    const opts = { width: 200, height: 100 };
    return (
      <D3Chart Chart={performanceChart} data={data} chartOpts={ opts } />
    )
  }

  renderActions() {
    const { getStarredSchools, details: {DBN}, unselectSchoolAction, starToggleAction } = this.props;

    const saved = getStarredSchools().some(s => s === DBN);
    return (
      <div className="school-detail-actions">
        <div className={`school-detail-action glyphicon glyphicon-star ${saved ? 'starred-school' : ''}`} onClick={() => starToggleAction(DBN, saved)}></div>
        <div className="school-detail-action glyphicon glyphicon-remove-circle" onClick={() => unselectSchoolAction(DBN)}></div>
      </div>
    );

    return actions;
  }

  render() {
    const { schoolName, DBN, gradeType, grades, district, address, demographic, performance } = this.props.details;

    return (
      <div className="school-detail panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <div className="">
              {schoolName}
              {this.renderActions()}
            </div>
            <div className="panel-subtitle">
              <span className="school-detail-type">{gradeType}</span>
              <small>{this.renderGrades(grades)}</small>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="school-detail-general-info col-md-12 col-lg-2">
            <h5>DBN: {DBN}</h5>
            {this.renderAddress(address)}
          </div>
          <div className="school-detail-demographics-container col-lg-5">
            <h5>Demographics</h5>
            <div className="school-detail-demographics">
              <D3Chart Chart={demoGraphicPieChart}/>
            </div>
          </div>
          <div className="col-lg-5">
            <h5>Performance</h5>
            <div className="school-detail-performance">
              {this.renderPerformance()}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

function connectState(state) {
  return {
    getStarredSchools: () => getStarredSchools(state.school)
  };
}

function connectDispatch(dispatch) {
  return {
    unselectSchoolAction: (DBN) => dispatch(unselectSchoolAction(DBN)),

    starToggleAction: (DBN, saved) => {
      if (saved) {
        unstarSchool(DBN);
        dispatch(unstarSchoolAction(DBN));
      } else {
        starSchool(DBN);
        dispatch(starSchoolAction(DBN));
      }
    }
  }
}

export default connect(connectState, connectDispatch)(SchoolDetails);
