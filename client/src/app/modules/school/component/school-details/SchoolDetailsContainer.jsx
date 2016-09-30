import { connect } from 'react-redux';
import { getSelectedSchools, unselectSchoolAction } from '../../school.store.js';

import SchoolDetails from './SchoolDetails';

class SchoolDetailsContainer extends React.Component {

  render() {
    const { selectedSchools, unselectSchoolAction } = this.props;
    const renderedSchools = selectedSchools.map(school => {

      return <SchoolDetails key={school.DBN} onChange={unselectSchoolAction} {...school} />
    });

    return (
      <div className="school-details-container">{renderedSchools}</div>
    );
  }

}

function connectState(state) {
  return {
    selectedSchools: getSelectedSchools(state.school)
  };
}

function connectDispatch(dispatch) {
  return {
    unselectSchoolAction: (DBN) => dispatch(unselectSchoolAction(DBN))
  }
}

export default connect(connectState, connectDispatch)(SchoolDetailsContainer)

