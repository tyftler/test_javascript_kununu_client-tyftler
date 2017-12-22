import React from 'react';
import { connect } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import './App.css';
import { fetchOldCities, fetchNewCities, addMatch } from '../../actions/cities';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10
    }
  }

  componentWillMount() {
    this.fetchOldCities();
  }

  fetchOldCities() {
    this.props.dispatch(fetchOldCities());
  }

  fetchNewCities(query) {
    if (!query.length) {
      return;
    }

    this.props.dispatch(fetchNewCities(query));
  }

  matchCities(oldCity, newCity) {
    const match = {
      old: oldCity,
      new: newCity
    };

    this.props.dispatch(addMatch(match));
    this.logCities(match);
  }

  logCities(match) {
    console.log('OLD:', match.old);
    console.log('NEW:', match.new);
  }

  showMore() {
    this.setState({limit: this.state.limit + 10});
  }

  renderMenuItemChildren(option, props) {
    if (option.levenshtein) {
      return (
        <div>
          Did you mean <b>{ option.name + ', ' + option.admin_area }</b>?
        </div>
      );
    }

    return (
      <div>
        <b>{ option.name }</b>, { option.admin_area }
      </div>
    );
  }

  render() {
    const cities = this.props.cities;

    if (cities.error) {
      return (
        <div>
          <h3>
            City Matching Tool
          </h3>
          { cities.error.stack }
        </div>
      );
    }

    if (cities.fetchingOld) {
      return (
        <div>
          <h3>
            City Matching Tool
          </h3>
          Fetching historical cities...
        </div>
      );
    }

    return (
      <div>
        <h3>
          City Matching Tool
        </h3>
        <div className="wrapper">
          <div className="header old">Historical Cities</div>
          <div className="header new">New geographical cities</div>
          <div className="header match">Matches</div>
          {
            cities.oldCities.slice(0, this.state.limit).map((oldCity, index) => {
              let matchButton = null;
              if (cities.matches.hasOwnProperty(oldCity.id)) {
                const match = cities.matches[oldCity.id];
                matchButton = (
                  <button
                    className="btn btn-block btn-outline-primary"
                    onClick={() => this.logCities(match)}
                  >
                    { match.old.id } &rarr; { match.new.id }
                  </button>
                );
              }

              return [
                <div key={oldCity.id + 'old'} className="old">
                  { index + 1 + '. ' + oldCity.name + ', ' + oldCity.admin_area }
                </div>,
                <div key={oldCity.id + 'new'} className="new">
                  <AsyncTypeahead
                    className={matchButton ? 'matched' : ''}
                    isLoading={cities.fetchingNew}
                    options={cities.options}
                    filterBy={(option, text) => true}
                    labelKey={option => option.name}
                    defaultSelected={[oldCity]}
                    onFocus={event => this.fetchNewCities.bind(this, event.target.value)()}
                    onSearch={value => this.fetchNewCities.bind(this, value)()}
                    onChange={selected => {
                      if (selected.length) {
                        this.matchCities(oldCity, selected[0]);
                      }
                    }}
                    renderMenuItemChildren={this.renderMenuItemChildren}
                  >
                  </AsyncTypeahead>
                </div>,
                <div key={oldCity.id + 'match'} className="match">
                  { matchButton }
                </div>
              ];
            })
          }
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={this.showMore.bind(this)}
        >
          Show more ({ cities.oldCities.length } total)
        </button>
      </div>
    );
  }
};

export default connect((store) => {
  return {
    cities: store.cities
  };
})(App);
