const express = require('express');

const app = express();

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

const { skis } = require('./data/animals');

function filterByQuery(query, skiArray) {
    let filteredResults = skiArray;
    if (query.id) {
      filteredResults = filteredResults.filter(ski => ski.id === query.id);
    }
    if (query.din) {
      filteredResults = filteredResults.filter(ski => ski.din === query.din);
    }
    if (query.sole) {
      filteredResults = filteredResults.filter(ski => ski.sole === query.sole);
    }
    return filteredResults;
  }

  app.get('/api/animals', (req, res) => {
    let results = skis;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
