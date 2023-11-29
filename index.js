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

app.get('/', (req, res) => {
  res.render('main', { view: '' });
});

app.get('/gender-per', (req, res) => {
  res.render('main', { view: 'genderPercView' });
});

app.get('/3d', (req, res) => {
  res.render('main', { view: 'worldMapView3D' });
});

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
