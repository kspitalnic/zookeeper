const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
  });

const { programs } = require('./data/p');

function filterByQuery(query, clientArray) {
    let filteredResults = clientArray;
    if (query.name) {
      filteredResults = filteredResults.filter(client => client.name === query.name);
    }
    if (query.program) {
      filteredResults = filteredResults.filter(client => client.program === query.program);
    }
    if (query.day) {
      filteredResults = filteredResults.filter(client => client.day === query.day);
    }
    return filteredResults;
  }


  app.get('/api/p', (req, res) => {
    let results = programs;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
