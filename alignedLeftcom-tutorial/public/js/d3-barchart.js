/* global d3 */

// Constants

// SVG setup
const width = 500;
const height = 100;

const barWidth = 20;
const barPadding = 1;

// Dataset creation
const dataset = [];
for (let i = 0; i < 30; i++) {
    dataset[i] = Math.floor(Math.random() * 51);
}

// SVG Construction - Bar chart
const svg = d3.select('body')
.append('svg')
.attr('width', width)
.attr('height', height);

svg.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr('x', (data, i) => i * (width / dataset.length))
.attr('y', (data) => height - data * 2)
.attr('width', width / dataset.length - barPadding)
.attr('height', (data) => data * 2)
.attr('fill', (data) => `rgb(0, 0, ${ data * 10 })`);

svg.selectAll('text')
.data(dataset)
.enter()
.append('text')
.text(data => data)
.attr('x', (data, i) => i * (width / dataset.length) + (width / dataset.length - barPadding) / 2)
.attr('y', (data) => height - (data * 2) + 14)
.attr('font-family', 'sans-serif')
.attr('font-size', '11px')
.attr('fill', 'white')
.attr('text-anchor', 'middle');
