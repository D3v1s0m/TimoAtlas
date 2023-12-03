const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const geojson = require("world-geojson");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}: ${req.method} ${req.url}`);
  next();
});

const views = [
  { name: 'World Map', description: 'A world map showing the population of each country', url: '/world-map', title: 'World Map' },
  { name: 'World Map 3D', description: 'A 3D world map showing the population of each country', url: '/world-map-3d', title: 'World Map 3D' },
  { name: 'Female %', description: 'A world map showing the female population percentage of each country', url: '/gender-per', title: 'Female Population Percentage' },
  { name: 'Female % 3D', description: 'A 3D world map showing the female population percentage of each country', url: '/gender-per-3d', title: 'Female Population Percentage 3D' }
];

app.get('/', (req, res) => {
  res.render('main', { views, title: 'TimoAtlas - Home' });
});

app.get('/world-map', (req, res) => {
  res.render('main', { view: 'worldMapView', title: 'World Map' });
});

app.get('/gender-per', (req, res) => {
  res.render('main', { view: 'genderPercView', title: 'Female Population Percentage' });
});

app.get('/world-map-3d', (req, res) => {
  res.render('main', { view: 'worldMapView3D' , title: 'World Map 3D' });
});

app.get('/gender-per-3d', (req, res) => {
  res.render('main', { view: 'genderPercView3D' , title: 'Gender Percentage 3D' });
});

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
