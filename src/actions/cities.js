import axios from 'axios';

import { API_URL } from '../constants';

export function fetchOldCities() {
  return {
    type: 'FETCH_OLD_CITIES',
    payload: axios.get(API_URL + '/v2/historical')
  };
}

export function fetchNewCities(query) {
  return {
    type: 'FETCH_NEW_CITIES',
    payload: axios.get(API_URL + '/v2/cities', {params: {q: query}})
  };
}

export function addMatch(match) {
  return {
    type: 'ADD_MATCH',
    payload: match
  };
}
