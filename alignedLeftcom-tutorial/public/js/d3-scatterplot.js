/* global d3 */

const dataset = [];
const numDataPoints = 50;
const xRange = Math.random() * 1000;
const yRange = Math.random() * 1000;
for (let i = 0; i < numDataPoints; i++) {
    let newNumber1 = Math.round(Math.random() * xRange);
    let newNumber2 = Math.round(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
}

// SVG parameters
const svgWidth = 700;
const svgHeight = 400;
const padding = 30;

// Scaling
const xScale = d3.scaleLinear()
.domain([0, d3.max(dataset, data => data[0])])
.range([0 + padding, svgWidth - padding * 2])
.nice();

const yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, data => data[1])])
.range([svgHeight - padding, 0 + padding])
.nice();

const rScale = d3.scaleLinear()
.domain([0, d3.max(dataset, data => data[1])])
.range([2, 5])
.nice();

const xAxis = d3.axisBottom()
.scale(xScale)
.ticks(5);

const yAxis = d3.axisLeft()
.scale(yScale)
.ticks(5);

// SVG creation
const svg = d3.select('body')
.append('svg')
.attr('width', svgWidth)
.attr('height', svgHeight);

svg.selectAll('circle')
.data(dataset)
.enter()
.append('circle')
.attr('cx', data => xScale(data[0]))
.attr('cy', data => yScale(data[1]))
.attr('r', (data) => rScale(data[1]));

// Data point labels
// svg.selectAll('text')
// .data(dataset)
// .enter()
// .append('text')
// .text((data) => `${data[0]}, ${data[1]}`)
// .attr('x', data => xScale(data[0]))
// .attr('y', data => yScale(data[1]))
// .attr('font-family', 'sans-serif')
// .attr('font-size', '11px')
// .attr('fill', 'red');

svg.append('g')
.attr('class', 'axis')
.attr('transform', `translate(0, ${svgHeight - padding})`)
.call(xAxis);

svg.append('g')
.attr('class', 'axis')
.attr('transform', `translate(${padding}, 0)`)
.call(yAxis);
