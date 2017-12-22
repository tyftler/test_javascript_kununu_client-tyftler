# City Matching Tool

## Usage

Start the API.

```sh
npm install
npm run serve
```

## Explanation

I took the following steps to improve the user experience and make the tool more efficient:

1. Prefilling old city names into the typeahead for matching new cities
2. Switching the columns for new geographical and old historical cities to make sure that all old cities get matched to a new city and no old city will be forgotten
3. Added two new API endpoints to make the new structure work and make use of the Levenshtein distance to make suggestions if a city is misspelled

Changes to the API:

```
/v2/historical               Get a list of old historical cities
/v2/cities?q=<query>         Get a list of new geographical city data matching a query (autocomplete and best match)
```
