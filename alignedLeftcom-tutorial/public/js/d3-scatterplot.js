/* global d3 */

const dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

// SVG parameters
const svgWidth = 500;
const svgHeight = 100;

// SVG creation
const svg = d3.select('body')
.append('svg')
.attr('width', svgWidth)
.attr('height', svgHeight);

svg.selectAll('circle')
.data(dataset)
.enter()
.append('circle')
.attr('cx', data => data[0])
.attr('cy', data => svgHeight - data[1])
.attr('r', (data) => Math.sqrt(data[1]));

svg.selectAll('text')
.data(dataset)
.enter()
.append('text')
.text((data) => `${data[0]}, ${data[1]}`)
.attr('x', data => data[0])
.attr('y', data => svgHeight - data[1])
.attr("font-family", "sans-serif")
.attr("font-size", "11px")
.attr("fill", "red");
