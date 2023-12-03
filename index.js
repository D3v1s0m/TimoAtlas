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
  { name: 'Population', description: 'View the population distribution of countries on a detailed world map.', url: '/world-map', title: 'Population' },
  { name: 'Population 3D', description: 'Explore a globe version of the world map with population details.', url: '/world-map-3d', title: 'Population - 3d' },
  { name: 'Population, Female', description: 'See the percentage of female population in countries on a world map.', url: '/gender-per', title: 'Population, Female' },
  { name: 'Population, Female 3D', description: 'Experience a three-dimensional globe representing the percentage of female population across countries.', url: '/gender-per-3d', title: 'Population, Female - 3D' }
];

app.get('/', (req, res) => {
  res.render('main', { views, title: 'TimoAtlas - Home' });
});

app.get('/world-map', (req, res) => {
  res.render('main', { view: 'worldMapView', title: 'Population' });
});

app.get('/gender-per', (req, res) => {
  res.render('main', { view: 'genderPercView', title: 'Gender Percentage' });
});

app.get('/world-map-3d', (req, res) => {
  res.render('main', { view: 'worldMapView3D' , title: 'Population 3D' });
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
