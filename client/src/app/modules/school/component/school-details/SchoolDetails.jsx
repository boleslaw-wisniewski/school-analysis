import React, { Component, PropTypes } from 'react';
import { has, keyBy, uniq } from 'lodash';
import D3Chart from 'modules/charts/D3Chart';
import demoGraphicPieChart from 'modules/charts/demographic/PieChart';
import performanceBarChart from 'modules/charts/performance/BarChart';

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
    if (!this.props.performance) {
      return;
    }

    const { performance: { english, math } } = this.props;
    let englishData = {}, mathData = {};
    if (has(english, 'nonDisabled.length') && english.nonDisabled.length > 0) {
      englishData = keyBy(english.nonDisabled, (d) => d.grade);
    } else if (has(english, 'total.length') && english.total.length > 0) {
      englishData = keyBy(english.total, (d) => d.grade);
    }
    if (has(math, 'nonDisabled.length') && math.nonDisabled.length > 0) {
      mathData = keyBy(math.nonDisabled, (d) => d.grade);
    } else if (has(math, 'total.length') && math.total.length > 0) {
      mathData = keyBy(math.total, (d) => d.grade);
    }

    const keys = uniq(Object.keys(englishData).concat(Object.keys(mathData)));
    const data = keys.map(grade => ({
      grade,
      math: mathData[grade] || [],
      english: englishData[grade] || []
    }));

    const opts = { width: 200, height: 50 };
    return data.map(d => {
      return (
        <D3Chart key={`performance-chart-${d.grade}`}
                 Chart={performanceBarChart} data={d} chartOpts={ opts } />
      )
    });
  }

  removeSchool = () => {
    const { onChange, DBN } = this.props;
    onChange(DBN);
  };

  render() {
    console.log('details', this.props);
    const { schoolName, DBN, gradeType, grades, district, address, demographic, performance } = this.props;

    return (
      <div className="school-detail panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <div className="">{schoolName}</div>
            <div className="school-detail-remove" onClick={this.removeSchool}>remove</div>
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
              <D3Chart Chart={demoGraphicPieChart}/>
              <D3Chart Chart={demoGraphicPieChart}/>
              <D3Chart Chart={demoGraphicPieChart}/>
              <D3Chart Chart={demoGraphicPieChart}/>
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

export default SchoolDetails;
