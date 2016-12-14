/* global d3 */

const dataset = [5, 10, 15, 20, 25];

d3.select('body')
.selectAll('p')
.data(dataset)
.enter()
.append('p')
.text(data => data)
.style('color', data => data > 15 ? 'red' : 'black');
