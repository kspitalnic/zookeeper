const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

const { clients } = require('./data/programs');

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

  function findByName(name, clientArray) {
    const result = clientArray.filter(client => client.name === name)[0];
    return result;
  }

  function createNewClient(body, clientArray){
    const client = body;
    clientArray.push(client);
    fs.writeFileSync(
      path.join(__dirname, './data/programs.json'),
      JSON.stringify({ clients: clientArray }, null, 2)
    );
    return client;
  }

  function validateClient(client) {
    if (!client.name || typeof client.name !== 'string') {
      return false;
    }
    if (!client.program || typeof client.program !== 'string') {
      return false;
    }
    if (!client.day || typeof client.day !== 'string') {
      return false;
    }
    return true;
  }

  app.get('/api/programs', (req, res) => {
    let results = clients;
    if (req.query) {
      results = filterByQuery(req.query, clients);
    }
    res.json(results);
  });

  app.get('/api/programs/:id', (req, res) => {
    const result = findByName(req.params.id, clients);
      res.json(result);
  });

  app.post('/api/programs', (req, res) => {
    console.log(req.body);
    //set id based on what the next index of the array will be 
    req.body.id=clients.length.toString()

    if(!validateClient(req.body)){
      res.status(400).send('The client is not propperly formatted');
      } else { 
        const client = createNewClient(req.body, clients)
        res.json(req.body);
      }
  });
