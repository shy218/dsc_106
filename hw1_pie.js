const datastring = fs.readFileSync('ucsd_cds_admission_data_2005_to_2018.json');
const data = JSON.parse(datastring);
var margin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
}

var width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var radius = Math.min(width, height) / 2 - margin


var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
data = {
  "fulltime_men_applied": data[0]["fulltime_men_applied"],
  "fulltime_women_applied": data[0]["fulltime_women_applied"]
}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function (d) {
    return d.value;
  })
var data_change = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('pie')
  .data(data_change)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function (d) {
    return (color(d.data.key))
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)