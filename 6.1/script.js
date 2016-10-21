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

	var top5 = sortArray.slice(0,5);

	//set the scales

	var scaleY = d3.scaleLinear()
		.domain([minY, maxY])
		.range([h, 0]);
	
	var scaleX = d3.scaleOrdinal()
		.domain(top5.map(function(d){ return d.country; }))  //.map creates a new array from an existing array
		.range(d3.range(30, w, w/5)); // in d3 documentation you need to add a third value where you set what's the distance between the first two (0 and w), that's what w/5 means. 

	//draw the Y and X axis

	var axisY = d3.axisLeft()
		.scale(scaleY);
	var axisX = d3.axisBottom()
		.scale(scaleX);

	plot.append("g") //actually appending the axis to the canvas
		.attr("transform", "translate(0, "+h+")") //moving the x axis to the bottom
		.attr("class", "axis")
	.call(axisX);

	plot.append("g").attr("class", "axis").call(axisY);


	//(draw the bars)

	var rect = plot.selectAll("rect")
		.data(top5)
		.enter()
		.append("rect")
		.attr("x", function(d){return scaleX(d.country)})
		.attr("y", function(d){return scaleY(d.count2012)})
		.attr("width", 30)
		.attr("height", function(d){return h-scaleY(d.count2012)})


	

});

function parse(d){
	return{
		country: d["Country"],
		count1900: +d["1900"],
		count1960: +d["1960"],
		count2012: +d["2012"],
	}
};