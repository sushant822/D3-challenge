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
/*
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


/*
// Level 1 Requirement, D3:  Create a scatter plot for visualization of data based on the 2014 ACS 1 year estimates.  
// Set up SVG definitions
var svgWidth = 960;
var svgHeight = 620;

// set up borders in svg
var margin = {
  top: 20, 
  right: 40, 
  bottom: 200,
  left: 100
};

// calculate chart height and width
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

// append a div class to the scatter element
var chart = d3.select('#scatter')
  .append('div')
  .classed('chart', true);

//append an svg element to the chart 
var svg = chart.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

//append an svg group
var chartGroup = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//initial parameters; x and y axis
var chosenXAxis = 'poverty';
var chosenYAxis = 'healthcare';

//a function for updating the x-scale variable upon click of label
function xScale(censusData, chosenXAxis) {
    //scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
        d3.max(censusData, d => d[chosenXAxis]) * 1.2])
      .range([0, width]);

    return xLinearScale;
}
//a function for updating y-scale variable upon click of label
function yScale(censusData, chosenYAxis) {
  //scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
      d3.max(censusData, d => d[chosenYAxis]) * 1.2])
    .range([height, 0]);

  return yLinearScale;
}
//a function for updating the xAxis upon click
function renderXAxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(2000)
    .call(bottomAxis);

  return xAxis;
}

//function used for updating yAxis variable upon click
function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(2000)
    .call(leftAxis);

  return yAxis;
}

//a function for updating the circles with a transition to new circles 
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(2000)
      .attr('cx', data => newXScale(data[chosenXAxis]))
      .attr('cy', data => newYScale(data[chosenYAxis]))

    return circlesGroup;
}

//function for updating STATE labels
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    textGroup.transition()
      .duration(2000)
      .attr('x', d => newXScale(d[chosenXAxis]))
      .attr('y', d => newYScale(d[chosenYAxis]));

    return textGroup
}
//function to stylize x-axis values for tooltips
function styleX(value, chosenXAxis) {

    //style based on variable
    //poverty
    if (chosenXAxis === 'poverty') {
        return `${value}%`;
    }
    //household income
    else if (chosenXAxis === 'income') {
        return `${value}`;
    }
    else {
      return `${value}`;
    }
}

//funtion for updating circles group
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    //poverty
    if (chosenXAxis === 'poverty') {
      var xLabel = 'Poverty:';
    }
    //income
    else if (chosenXAxis === 'income'){
      var xLabel = 'Median Income:';
    }
    //age
    else {
      var xLabel = 'Age:';
    }
//Y label
  //healthcare
  if (chosenYAxis ==='healthcare') {
    var yLabel = "No Healthcare:"
  }
  else if(chosenYAxis === 'obesity') {
    var yLabel = 'Obesity:';
  }
  //smoking
  else{
    var yLabel = 'Smokers:';
  }

  //create tooltip
  var toolTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-8, 0])
    .html(function(d) {
        return (`${d.state}<br>${xLabel} ${styleX(d[chosenXAxis], chosenXAxis)}<br>${yLabel} ${d[chosenYAxis]}%`);
  });

  circlesGroup.call(toolTip);

  //add
  circlesGroup.on('mouseover', toolTip.show)
    .on('mouseout', toolTip.hide);

    return circlesGroup;
}
//retrieve data
d3.csv('./assets/data/data.csv').then(function(censusData) {

    console.log(censusData);
    
    //Parse data
    censusData.forEach(function(data){
        data.obesity = +data.obesity;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    //create linear scales
    var xLinearScale = xScale(censusData, chosenXAxis);
    var yLinearScale = yScale(censusData, chosenYAxis);

    //create x axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append X
    var xAxis = chartGroup.append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0, ${height})`)
      .call(bottomAxis);

    //append Y
    var yAxis = chartGroup.append('g')
      .classed('y-axis', true)
      //.attr
      .call(leftAxis);
    
    //append Circles
    var circlesGroup = chartGroup.selectAll('circle')
      .data(censusData)
      .enter()
      .append('circle')
      .classed('stateCircle', true)
      .attr('cx', d => xLinearScale(d[chosenXAxis]))
      .attr('cy', d => yLinearScale(d[chosenYAxis]))
      .attr('r', 14)
      .attr('opacity', '.5');

    //append Initial Text
    var textGroup = chartGroup.selectAll('.stateText')
      .data(censusData)
      .enter()
      .append('text')
      .classed('stateText', true)
      .attr('x', d => xLinearScale(d[chosenXAxis]))
      .attr('y', d => yLinearScale(d[chosenYAxis]))
      .attr('dy', 3)
      .attr('font-size', '10px')
      .text(function(d){return d.abbr});

    //create a group for the x axis labels
    var xLabelsGroup = chartGroup.append('g')
      .attr('transform', `translate(${width / 2}, ${height + 10 + margin.top})`);

    var povertyLabel = xLabelsGroup.append('text')
      .classed('aText', true)
      .classed('active', true)
      .attr('x', 0)
      .attr('y', 20)
      .attr('value', 'poverty')
      .text('In Poverty (%)');
      
    var ageLabel = xLabelsGroup.append('text')
      .classed('aText', true)
      .classed('inactive', true)
      .attr('x', 0)
      .attr('y', 40)
      .attr('value', 'age')
      .text('Age (Median)');  

    var incomeLabel = xLabelsGroup.append('text')
      .classed('aText', true)
      .classed('inactive', true)
      .attr('x', 0)
      .attr('y', 60)
      .attr('value', 'income')
      .text('Household Income (Median)')

    //create a group for Y labels
    var yLabelsGroup = chartGroup.append('g')
      .attr('transform', `translate(${0 - margin.left/4}, ${height/2})`);

    var healthcareLabel = yLabelsGroup.append('text')
      .classed('aText', true)
      .classed('active', true)
      .attr('x', 0)
      .attr('y', 0 - 20)
      .attr('dy', '1em')
      .attr('transform', 'rotate(-90)')
      .attr('value', 'healthcare')
      .text('Without Healthcare (%)');
    
    var smokesLabel = yLabelsGroup.append('text')
      .classed('aText', true)
      .classed('inactive', true)
      .attr('x', 0)
      .attr('y', 0 - 40)
      .attr('dy', '1em')
      .attr('transform', 'rotate(-90)')
      .attr('value', 'smokes')
      .text('Smoker (%)');
    
    var obesityLabel = yLabelsGroup.append('text')
      .classed('aText', true)
      .classed('inactive', true)
      .attr('x', 0)
      .attr('y', 0 - 60)
      .attr('dy', '1em')
      .attr('transform', 'rotate(-90)')
      .attr('value', 'obesity')
      .text('Obese (%)');
    
    //update the toolTip
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    //x axis event listener
    xLabelsGroup.selectAll('text')
      .on('click', function() {
        var value = d3.select(this).attr('value');

        if (value != chosenXAxis) {

          //replace chosen x with a value
          chosenXAxis = value; 

          //update x for new data
          xLinearScale = xScale(censusData, chosenXAxis);

          //update x 
          xAxis = renderXAxis(xLinearScale, xAxis);

          //upate circles with a new x value
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          //update text 
          textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          //update tooltip
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          //change of classes changes text
          if (chosenXAxis === 'poverty') {
            povertyLabel.classed('active', true).classed('inactive', false);
            ageLabel.classed('active', false).classed('inactive', true);
            incomeLabel.classed('active', false).classed('inactive', true);
          }
          else if (chosenXAxis === 'age') {
            povertyLabel.classed('active', false).classed('inactive', true);
            ageLabel.classed('active', true).classed('inactive', false);
            incomeLabel.classed('active', false).classed('inactive', true);
          }
          else {
            povertyLabel.classed('active', false).classed('inactive', true);
            ageLabel.classed('active', false).classed('inactive', true);
            incomeLabel.classed('active', true).classed('inactive', false);
          }
        }
      });
    //y axis lables event listener
    yLabelsGroup.selectAll('text')
      .on('click', function() {
        var value = d3.select(this).attr('value');

        if(value !=chosenYAxis) {
            //replace chosenY with value  
            chosenYAxis = value;

            //update Y scale
            yLinearScale = yScale(censusData, chosenYAxis);

            //update Y axis 
            yAxis = renderYAxis(yLinearScale, yAxis);

            //Udate CIRCLES with new y
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

            //update TEXT with new Y values
            textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

            //update tooltips
            circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

            //Change of the classes changes text
            if (chosenYAxis === 'obesity') {
              obesityLabel.classed('active', true).classed('inactive', false);
              smokesLabel.classed('active', false).classed('inactive', true);
              healthcareLabel.classed('active', false).classed('inactive', true);
            }
            else if (chosenYAxis === 'smokes') {
              obesityLabel.classed('active', false).classed('inactive', true);
              smokesLabel.classed('active', true).classed('inactive', false);
              healthcareLabel.classed('active', false).classed('inactive', true);
            }
            else {
              obesityLabel.classed('active', false).classed('inactive', true);
              smokesLabel.classed('active', false).classed('inactive', true);
              healthcareLabel.classed('active', true).classed('inactive', false);
            }
          }
        });
});
*/

