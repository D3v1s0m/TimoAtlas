// Get the dimensions of the #map-container
const container = document.getElementById("map-container");
const rect = container.getBoundingClientRect();
const width = rect.width;
const height = rect.height;
const geojson = require("world-geojson");

console.log(`width: ${width}, height: ${height}`);

// Define a projection
const projection = d3
  .geoMercator()
  .scale((width + 1) / 2 / Math.PI)
  .translate([width / 2, height / 1.5]);

const path = d3.geoPath().projection(projection);

const svg = d3
  .select("#map-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create a tooltip
const tooltip = d3
  .select("#map-container")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Load GeoJSON data
geojson.forCountry("United States of America").then(function (geojson) {
  // Save geojson in a variable for later use
  const states = geojson;

  // Use D3.js to draw the map
  svg
    .selectAll("path")
    .data(states.features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
});
// d3.json("/world.geo.json").then(function (geojson) {
//   // Save geojson in a variable for later use
//   const countries = geojson;

//   // Use D3.js to draw the map
//   svg.selectAll("path")
//     .data(countries.features)
//     .enter()
//     .append("path")
//     .attr("d", path)
//     .on("mouseover", handleMouseOver)
//     .on("mouseout", handleMouseOut);
// });

function handleMouseOver(event, d) {
  // Handle mouseover event (e.g., show tooltip, highlight country)
  d3.select(this)
    .transition()
    .duration(200)
    .style("fill", "orange")
    .attr("d", (d) => path(d)); // Reset path generator

  // Display tooltip with country information
  tooltip.transition().duration(200).style("opacity", 0.9);

  tooltip
    .html(d.properties.name)
    .style("left", event.pageX + "px")
    .style("top", event.pageY - 28 + "px");
}

function handleMouseOut(event, d) {
  // Handle mouseout event (e.g., hide tooltip, reset country color)
  d3.select(this)
    .transition()
    .duration(200)
    .style("fill", "initial")
    .attr("d", (d) => path(d)); // Reset path generator

  // Hide the tooltip
  tooltip.transition().duration(500).style("opacity", 0);
}
