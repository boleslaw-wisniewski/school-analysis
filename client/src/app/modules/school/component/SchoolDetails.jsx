import React, { Component, PropTypes } from 'react';

class SchoolDetails extends Component {

  propTypes: {
    DBN: PropTypes.string,
    schoolName: PropTypes.string
  };

  render() {
    const { schoolName, DBN } = this.props;
    return (
      <div>
        <div>Some School stuff for {schoolName}</div>
        <div>{DBN}</div>
      </div>
    );
  }

}

export default SchoolDetails;
