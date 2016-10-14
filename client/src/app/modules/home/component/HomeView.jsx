import React from 'react';

import SchoolSuggestionsContainer from '../../school/component/school-suggestions/SchoolSuggestionsContainer';
import SchoolDetailsContainer from '../../school/component/school-details/SchoolDetailsContainer.jsx';

import './home.scss';

class HomeView extends React.Component {

  render() {
    return (
      <div className="home-screen">
          <h1>NYC school comparisons!</h1>
          <p className="lead">Lorem ipsum dolor sit amet, rebum persequeris contentiones no nam. Dictas molestiae vim et, eum cu duis novum civibus, et sale simul dolores eos. Vis eligendi abhorreant te, ei vis tempor conceptam vituperatoribus. In integre equidem delenit est.</p>

        <SchoolSuggestionsContainer />

        <SchoolDetailsContainer />
      </div>
    )}
}

export default HomeView;
