/* global d3 */

const dataset = [];
const numDataPoints = 50;

// SVG parameters
const svgWidth = 700;
const svgHeight = 400;
const padding = 30;

let xScale;
let yScale;
let rScale;
let xAxis;
let yAxis;

// SVG creation
const svg = d3.select('body')
.append('svg')
.attr('width', svgWidth)
.attr('height', svgHeight);

svg.append('clipPath')                  //Make a new clipPath
    .attr('id', 'chart-area')           //Assign an ID
    .append('rect')                     //Within the clipPath, create a new rect
    .attr('x', padding)                 //Set rect's position and size…
    .attr('y', padding)
    .attr('width', svgWidth - padding * 3)
    .attr('height', svgHeight - padding * 2);

createNewDataValues();

function createNewDataValues() {
    let xRange = Math.random() * 1000;
    let yRange = Math.random() * 1000;
    for (let i = 0; i < numDataPoints; i++) {
        let newNumber1 = Math.round(Math.random() * xRange);
        let newNumber2 = Math.round(Math.random() * yRange);
        dataset[i] = ([newNumber1, newNumber2]);
    }

    // Scaling
    xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, data => data[0])])
    .range([0 + padding, svgWidth - padding * 2])
    .nice();

    yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, data => data[1])])
    .range([svgHeight - padding, 0 + padding])
    .nice();

    rScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, data => data[1])])
    .range([4, 6])
    .nice();

    xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);

    yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);

}

svg.append('g')
.attr('id', 'circles')
.attr('clip-path', 'url(#chart-area)')
.selectAll('circle')
.data(dataset)
.enter()
.append('circle')
.attr('cx', data => xScale(data[0]))
.attr('cy', data => yScale(data[1]))
.attr('r', (data) => rScale(data[1]));

svg.append('g')
.attr('class', 'x axis')
.attr('transform', `translate(0, ${svgHeight - padding})`)
.call(xAxis);

svg.append('g')
.attr('class', 'y axis')
.attr('transform', `translate(${padding}, 0)`)
.call(yAxis);

// Event listener
d3.select('p')
.on('click', function () {
    createNewDataValues();
    updateDataValues();
});

function updateDataValues() {
    svg.selectAll('circle')
    .data(dataset)
    .transition()
    .duration(1000)
    .on('start', function() {      // <-- Executes at start of transition
        d3.select(this)
        .attr('fill', 'magenta');
    })
    .attr('cx', data => xScale(data[0]))
    .attr('cy', data => yScale(data[1]))
    .attr('r', (data) => rScale(data[1]))
    .transition()
    .duration(350)
    .attr('fill', 'black');

    svg.select('.x.axis')
    .transition()
    .duration(1000)
    .call(xAxis);

    svg.select('.y.axis')
    .transition()
    .duration(1000)
    .call(yAxis);

}
