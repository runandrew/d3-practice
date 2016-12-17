/* global d3 */

// Constants

// SVG setup
const width = 800;
const height = 250;
const maxNumber = 100;
let keyCounter = 0;
const key = data => data.key;

// SVG Construction - Bar chart
const svg = d3.select('body')
.append('svg')
.attr('width', width)
.attr('height', height);

const dataset = (new Array(20)).fill(0, 0, 20);

// Dataset creation
createNewDataValues();
var bars = svg.selectAll('rect').data(dataset, key);
var text = svg.selectAll('text').data(dataset, key);

// Axes
const xScale = d3.scaleBand()
.domain(d3.range(dataset.length))
.rangeRound([0, width])
.paddingInner(0.05);

const yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, data => data.value)])
.range([height, 0])
.nice();

bars.enter()
.append('rect')
.attr('x', (data, i) => xScale(i))
.attr('y', (data) => yScale(data.value))
.attr('width', xScale.bandwidth())
.attr('height', (data) => height - yScale(data.value))
.attr('fill', (data) => `rgb(0, 0, ${ data.value * 10 })`);

text.enter()
.append('text')
.text(data => data.value)
.attr('x', (data, i) => xScale(i) + xScale.bandwidth() / 2)
.attr('y', (data) => yScale(data.value) + 14)
.attr('font-family', 'sans-serif')
.attr('font-size', '11px')
.attr('fill', 'white')
.attr('text-anchor', 'middle');

// Event listener
d3.select('#updateData')
.on('click', () => {
    updateRandomDataValues();
    updateDataValues();
});

d3.select('#addData')
.on('click', () => {
    addDataValue();
    updateDataValues();
});

d3.select('#removeData')
.on('click', () => {
    removeDataValue();
    updateDataValues();
});

function generateRandomNumber(maxValue) {
    return Math.floor(Math.random() * (maxValue + 1));
}

function createNewDataValues() {
    for (let i = 0; i < dataset.length; i++) {
        dataset[i] = {
            key: keyCounter,
            value: generateRandomNumber(maxNumber)
        };
        keyCounter++;
    }
}

function updateRandomDataValues() {
    for (let i = 0; i < dataset.length; i++) {
        dataset[i].value = generateRandomNumber(maxNumber);
    }
}

function updateScales() {
    // Reset the x and y domain
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset, data => data.value)]);
}

function updateDataRefs() {
    bars = svg.selectAll('rect').data(dataset, key);
    text = svg.selectAll('text').data(dataset, key);
}

function updateDataValues() {
    updateDataRefs();

    bars.transition()
    .duration(500)
    .attr('x', (data, i) => xScale(i))
    .attr('y', data => yScale(data.value))
    .attr('width', xScale.bandwidth())
    .attr('height', data => height - yScale(data.value))
    .attr('fill', (data) => `rgb(0, 0, ${ data.value * 10 })`);

    text.transition()
    .duration(500)
    .text(data => data.value)
    .attr('x', (data, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr('y', data => yScale(data.value) + 14);
}


function addDataValue() {

    // Add new data value
    dataset.push({
        key: keyCounter,
        value: generateRandomNumber(maxNumber)
    });
    keyCounter++;

    // Reset the x and y domain
    updateScales();
    updateDataRefs();

    // Create the new bar and set it out of view
    bars.enter()
    .append('rect')
    .attr('x', width)
    .attr('y', data => yScale(data.value))
    .attr('width', xScale.bandwidth())
    .attr('height', data => height - yScale(data.value))
    .attr('fill', (data) => `rgb(0, 0, ${ data.value * 10 })`);

    text.enter()
    .append('text')
    .text(data => data.value)
    .attr('x', () => width + xScale.bandwidth() / 2)
    .attr('y', (data) => yScale(data.value) + 14)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle');
}


function removeDataValue() {
    dataset.shift();
    updateDataRefs();
    updateScales();

    bars.exit()
    .transition()
    .duration(500)
    .attr('x', -xScale.bandwidth())
    .remove();

    text.exit()
    .transition()
    .duration(500)
    .attr('x', -xScale.bandwidth())
    .remove();

}
