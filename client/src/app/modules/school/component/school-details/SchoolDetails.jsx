import React, { Component, PropTypes } from 'react';

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
              <D3Chart Chart={performanceBarChart}/>
              <D3Chart Chart={performanceBarChart}/>
              <D3Chart Chart={performanceBarChart}/>
              <D3Chart Chart={performanceBarChart}/>
              <D3Chart Chart={performanceBarChart}/>
              <D3Chart Chart={performanceBarChart}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default SchoolDetails;
