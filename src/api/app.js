const fetch = require('node-fetch');
const express = require('express');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

const api_key = process.env.DARK_SKY_API_KEY;
const api_endpoint = 'https://api.darksky.net/forecast';

app.get('/forecast', async (req, res) => {
  const url = `${api_endpoint}/${api_key}/${req.query.lat},${req.query.lon}`;
  const fetch_res = await fetch(url).catch(() => {
    console.error('Network or permission failure fetching darksky forecast');
    return;
  });
  if (!fetch_res.ok) {
    console.error('Could not fetch darksky forecast: ' + fetch_res.statusText);
    return;
  }
  const json = await fetch_res.json();
  console.log(json);
  res.send({
    temp: json.currently.temperature,
    summary: json.hourly.summary
  })
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});