const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const request = require('request');
const { PORT } = require('./config.js');
const { API_KEY } = require('./config.js');

// Function to update the JSON file
function updateJSONFile(ticker) {
  const url = 'https://api.spoonacular.com/recipes/complexSearch?query=' + ticker + '&apiKey=' + API_KEY + '&includeNutrition=true';

  request.get({
    url: url,
    json: true,
    headers: { 'User-Agent': 'request' }
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status', res.statusCode);
    } else {
      console.log(data);
      const newData = JSON.stringify(data);
      fs.writeFile('frontend/static/js/views/' + ticker + '.json', newData, err => {
        if (err) throw err;
        console.log('Success');
      });
    }
  });
}



app.get('/ticker=:id', function (req, res) {
  const ticker = req.params.id;
  console.log(ticker);

  updateJSONFile(ticker);

  res.end('Success');
});

// Get the existing JSON files in the directory
fs.readdir(path.resolve(__dirname, 'frontend', 'static', 'js', 'views'), (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Update JSON files for each existing ticker file
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const ticker = file.slice(0, -5); // Remove the file extension
      updateJSONFile(ticker);
    }
  });
});

app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT || 4001, () => {
  console.log('Server running on port', PORT);
});
