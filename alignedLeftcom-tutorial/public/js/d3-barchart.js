/* global d3 */

// Constants

// SVG setup
const width = 1200;
const height = 250;

const maxNumber = 100;

// SVG Construction - Bar chart
const svg = d3.select('body')
.append('svg')
.attr('width', width)
.attr('height', height);

// Dataset creation
const dataset = [];
createNewDataValues();

function createNewDataValues() {
    for (let i = 0; i < 60; i++) {
        dataset[i] = Math.floor(Math.random() * (maxNumber + 1));
    }
    updateDataValues();
}

// Axes
const xScale = d3.scaleBand()
.domain(d3.range(dataset.length))
.rangeRound([0, width])
.paddingInner(0.05);

const yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, data => data)])
.range([height, 0])
.nice();


svg.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr('x', (data, i) => xScale(i))
.attr('y', (data) => yScale(data))
.attr('width', xScale.bandwidth())
.attr('height', (data) => height - yScale(data))
.attr('fill', (data) => `rgb(0, 0, ${ data * 10 })`);

svg.selectAll('text')
.data(dataset)
.enter()
.append('text')
.text(data => data)
.attr('x', (data, i) => xScale(i) + xScale.bandwidth() / 2)
.attr('y', (data) => yScale(data) + 14)
.attr('font-family', 'sans-serif')
.attr('font-size', '11px')
.attr('fill', 'white')
.attr('text-anchor', 'middle');

// Event listener
d3.select('p')
.on('click', createNewDataValues);

function updateDataValues() {
    svg.selectAll('rect')
    .data(dataset)
    .transition()
    // .delay((data, i) => i * 50)
    .duration(500)
    .attr('y', data => yScale(data))
    .attr('height', data => height - yScale(data))
    .attr('fill', (data) => `rgb(0, 0, ${ data * 10 })`);

    svg.selectAll('text')
    .data(dataset)
    .transition()
    // .delay((data, i) => i * 50)
    .duration(500)
    .text(data => data)
    .attr('y', data => yScale(data) + 14);
}
