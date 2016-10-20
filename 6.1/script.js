console.log('6.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');

//Import data and parse
d3.csv('../data/olympic_medal_count.csv',parse,function(err, rows){
	console.log(err)
	console.table(rows);

	var minY= 0;
	var maxY= 104;


	var sortArray = rows.sort(function(a, b){
		return b.count2012 - a.count2012;
	})

	var sliceArray = sortArray.slice(0,5);

	//set the scales

	var scaleY = d3.scaleLinear()
		.domain([minY, maxY])
		.range([h,0]);
	
	var scaleX = d3.scaleOrdinal()
		.domain(sliceArray.map(function(d){ return d.country; }))  //.map creates a new array from an existing array
		.range(d3.range(0, w, w/5)); // in d3 documentation you need to add a third value where you set what's the distance between the first two (0 and w), that's what w/5 means. 

	//draw the Y and X axis

	var axisY = d3.axisLeft()
		.scale(scaleY);
	var axisX = d3.axisBottom()
		.scale(scaleX);

	plot.append("g").call(axisX);
	plot.append("g").call(axisY);

	//rows.forEach (draw the bars)

	/* rows.forEach(function(country, i){
		plot.append("rect")
		.attr("x",50)
		.attr("y", function(d){return scaleY;})
		.attr("width", function(d){return 30;})
		.attr("height", function(d){return d.count2012;})
	}); */

});

function parse(d){
	return{
		country: d["Country"],
		count1900: +d["1900"],
		count1960: +d["1960"],
		count2012: +d["2012"],
	}
};