const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

const { clients } = require('./data/p');

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

  function findById(name, clientArray) {
    const result = clientArray.filter(client => client.name === name)[0];
    return result;
  }

  app.get('/api/p', (req, res) => {
    let results = programs;
    if (req.query) {
      results = filterByQuery(req.query, clients);
    }
    res.json(results);
  });

  app.get('/api/p/:id', (req, res) => {
    const result = findById(req.params.id, clients);
      res.json(result);
  });