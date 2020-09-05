// @TODO: YOUR CODE HERE!

// data
//var dataArray = [1, 2, 3];
//var dataCategories = ["one", "two", "three"];

d3.csv("assets/data/data.csv").then (data => {
    var dataCategories = data.map(data => data.poverty);
    //data.forEach(data => console.log(`Poverty: ${data.poverty}`));

    var dataArray = data.map(data => data.healthcare);
    //data.forEach(data => console.log(`Healthcare: ${data.healthcare}`));

    var svgHeight = 400;
var svgWidth = 1000;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// scale y to chart height
var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataArray)])
  .range([chartHeight, 0]);

// scale x to chart width
var xScale = d3.scaleBand()
  .domain(dataCategories)
  .range([0, chartWidth])
  .padding(0.05);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
  .call(yAxis);

/* Note: The above code is equivalent to this:
    var g = chartGroup.append("g");

    yAxis(g);
*/
// Append Data to chartGroup
chartGroup.selectAll(".bar")
  .data(dataArray)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("x", (d, i) => xScale(dataCategories[i]))
  .attr("y", d => yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", d => chartHeight - yScale(d));
});

// svg container




/*d3.csv("assets/data/data.csv").then (data => {
    var poverty = data.map(data => data.poverty);
    data.forEach(data => console.log(`Poverty: ${data.poverty}`));

    var healthcare = data.map(data => data.healthcare);
    data.forEach(data => console.log(`Healthcare: ${data.healthcare}`));
});*/