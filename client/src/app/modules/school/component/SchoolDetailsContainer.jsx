import { connect } from 'react-redux';
import { getSelectedSchools } from '../school.store';

import SchoolDetails from './SchoolDetails';

class SchoolDetailsContainer extends React.Component {

  render() {
    const { selectedSchools } = this.props;
    const renderedSchools = selectedSchools.map(school => <SchoolDetails key={school.DBN} {...school} />);

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

export default connect(connectState)(SchoolDetailsContainer)

