import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import Fuse from 'fuse.js';

import 'styles/suggestions.scss';
import './schoolsuggestions.scss';

import { getSchoolNames, fetchSchoolsAction, receiveSchoolsAction, selectSchoolAction } from '../../school.store';
import { isEmpty } from '../../../../store/StoreStatus';
import { fetchSchools, fetchSchoolByDBN } from '../../school.service';

const initialState = {
  inputValue: '',
  filteredSuggestions: []
};
class SchoolSuggestionsContainer extends React.Component {

  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const { isEmpty, fetchSchools } = this.props;
    if (isEmpty) {
      fetchSchools()
    }
  }

  clearSuggestion() {
    this.setState(initialState);
  }

  filterSuggestions(value) {
    const inputValue = value.trim();
    if (inputValue.length === 0) {
      return [];
    }
    const { schoolSearch } = this.props;
    return schoolSearch.search(inputValue);
  }

  renderSuggestion(school) {
    return <span>{school.schoolName} ({school.DBN})</span>
  }

  getSuggestionValue(school) {
    return school.schoolName;
  }

  onChange = (event, { newValue }) => {
    this.setState({
      inputValue: newValue,
      filteredSuggestions: this.filterSuggestions(newValue)
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.selectSchool(suggestion);
  };

  render() {
    const { schools } = this.props;
    const { inputValue, filteredSuggestions } = this.state;

    const inputProps = {
      placeholder: 'Select a school name or DBN',
      value: inputValue,
      onChange: this.onChange
    };
    return (
      <div className="school-suggestions-container">
        <Autosuggest
          suggestions={filteredSuggestions}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => this.clearSuggestion()}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps}
        />
      </div>
    );
  }

}

function connectState(state) {
  const schoolNames = getSchoolNames(state.school);
  const schoolSearch = new Fuse(schoolNames, {
    keys: ["schoolName", "DBN"],
    threshold: 0, matchAllTokens: true, tokenize: true, shouldSort: false });

  return {
    schools: schoolNames,
    schoolSearch,
    isEmpty: isEmpty(state.school)
  };
}

function connectDispatch(dispatch) {
  return {
    fetchSchools: () => {
      dispatch(fetchSchoolsAction());
      fetchSchools()
        .then(schoolNames => dispatch(receiveSchoolsAction(schoolNames)));
    },

    selectSchool: (school) => {
      dispatch(fetchSchoolsAction());
      fetchSchoolByDBN(school.DBN)
        .then(school => dispatch(selectSchoolAction(school)));
    }

  }
}

export default connect(connectState, connectDispatch)(SchoolSuggestionsContainer)
