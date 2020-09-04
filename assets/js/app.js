// @TODO: YOUR CODE HERE!
d3.csv("assets/data/data.csv").then (data => {
    var poverty = data.map(data => data.poverty);
    data.forEach(data => console.log(data.poverty));
});