const initialState = {
  oldCities: [],
  newCities: {
    autocomplete: [],
    levenshtein: null
  },
  matches: [],
  options: [],
  fetchingOld: false,
  fetchingNew: false,
  error: null
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_OLD_CITIES_PENDING':
      return {...state, fetchingOld: true};
    case 'FETCH_OLD_CITIES_REJECTED':
      return {...state, fetchingOld: false, error: action.payload};
    case 'FETCH_OLD_CITIES_FULFILLED':
      return {
        ...state,
        fetchingOld: false,
        oldCities: action.payload.data
      };
    case 'FETCH_NEW_CITIES_PENDING':
      return {...state, fetchingNew: true};
    case 'FETCH_NEW_CITIES_REJECTED':
      return {...state, fetchingNew: false, error: action.payload};
    case 'FETCH_NEW_CITIES_FULFILLED':
      let options = action.payload.data.autocomplete;
      if (!options.length) {
        options = [
          {
            ...action.payload.data.levenshtein,
            levenshtein: true
          }
        ];
      }

      return {
        ...state,
        fetchingNew: false,
        newCities: action.payload.data,
        options: options
      };
    case 'ADD_MATCH':
      let matches = state.matches.slice();
      matches[action.payload.old.id] = action.payload;

      return {...state, matches: matches};
    default:
      return state;
  }
};

export default citiesReducer;
