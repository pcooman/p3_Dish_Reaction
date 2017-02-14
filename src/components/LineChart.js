const { createClass, PropTypes } = require("react");
const React = require("react");

const _ = require("lodash");
const d3 = require("d3");

const LineChart = createClass({
  displayName: "LineChart",

    propTypes: {
    data: PropTypes.array.isRequired,
    xColumn: PropTypes.string.isRequired,
    yColumn: PropTypes.array.isRequired,
    lColumn: PropTypes.array,
    uColumn: PropTypes.array,
    timeFormat: PropTypes.string.isRequired,

    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,

    xLabelText: PropTypes.string,
    xLabelFontFamily: PropTypes.string,
    xLabelFontSize: PropTypes.string,
    xLabelFontColor: PropTypes.string,
    xLabelFontWeight: PropTypes.string,
    xTickLabelPosition: PropTypes.string,
    xTickLabelFontFamily: PropTypes.string,
    xTickLabelFontSize: PropTypes.string,
    xTickTickLabelFontColor: PropTypes.string ,
    xTickLabelFontWeight: PropTypes.string,
    xTickCount: PropTypes.number,
    xCustomEndDate: PropTypes.string,
    xCustomStartDate: PropTypes.string,
    xPreTimeInterval: PropTypes.string,
    xPreIntervalCount: PropTypes.number,
    xPostTimeInterval: PropTypes.string,
    xPostIntervalCount: PropTypes.number,

    yLabelText: PropTypes.string,
    yLabelFontFamily: PropTypes.string,
    yLabelFontSize: PropTypes.string,
    yLabelFontColor: PropTypes.string,
    yLabelFontWeight: PropTypes.string,
    yTickLabelPosition: PropTypes.string,
    yTickLabelFontFamily: PropTypes.string,
    yTickLabelFontSize: PropTypes.string,
    yTickLabelFontColor: PropTypes.string ,
    yTickLabelFontWeight: PropTypes.string,
    yTickCount: PropTypes.number,
    yCustomMaxValue: PropTypes.number,
    yCustomMinValue: PropTypes.number,

    bubbleRadius: PropTypes.number,
    bubbleFillColor: PropTypes.string,
    bubbleEdgeColor: PropTypes.array,
    bubbleEdgeThickness: PropTypes.number,

    lineStrokeColor: PropTypes.array,
    lineStrokeWidth: PropTypes.number,

    xMarkerPosition: PropTypes.array,
    markerLineColor: PropTypes.string,
    markerLineWidth: PropTypes.number,
    markerLabelText: PropTypes.array,
    markerLabelFontFamily: PropTypes.string,
    markerLabelFontSize: PropTypes.string,
    markerLabelFontColor: PropTypes.string,
    markerLabelFontWeight: PropTypes.string,

    intervalColor: PropTypes.array,
    legendWidth: PropTypes.number,
    legendBubbleArea: PropTypes.number,
    legendLabelText: PropTypes.array,
    legendLabelFontFamily: PropTypes.string,
    legendLabelFontSize: PropTypes.string,
    legendLabelFontColor: PropTypes.string,
    legendLabelFontWeight: PropTypes.string,
    legendCaptionText: PropTypes.string,  
    legendCaptionFontFamily: PropTypes.string,
    legendCaptionFontSize: PropTypes.string,
    legendCaptionFontColor: PropTypes.string,
    legendCaptionFontWeight: PropTypes.string,  
  },

  getDefaultProps() {
    return {
      chartHeight: 500,
      chartWidth: 500,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 30,
      marginBottom: 30,

      xLabelFontFamily: 'Lato',
      xLabelFontSize: '13px',
      xLabelFontColor: 'black',
      xLabelFontWeight: 'bold',
      xTickLabelPosition: 'top',
      xTickLabelFontFamily: 'Lato',
      xTickLabelFontSize: '11px',
      xTickLabelFontColor: 'black',
      xTickLabelFontWeight: 'normal',
      xTickCount: 5,

      xPreTimeInterval: 'day',
      xPreIntervalCount: 0,
      xPostTimeInterval: 'day',
      xPostIntervalCount: 0,
     
      yLabelFontFamily: 'Lato',
      yLabelFontSize: '13px',
      yLabelFontColor: 'black',
      yLabelFontWeight: 'bold',
      yTickTickLabelPosition: 'bottom',
      yTickTickLabelFontFamily: 'Lato',
      yTickLabelFontSize: '11px',
      yTickLabelFontColor: 'black',
      yTickLabelFontWeight: 'normal',
      yTickCount: 5, 

      bubbleRadius: 5,
      bubbleFillColor: 'white',
      bubbleEdgeColor: '#0194D3',
      bubbleEdgeThickness: 3,

      lineStrokeColor: '#0194D3',
      lineStrokeWidth: 3,

      markerLineColor: 'D1D3D4',
      markerLineWidth: 2,
      markerLabelFontFamily: 'Lato',
      markerLabelFontSize: '11px',
      markerLabelFontColor: 'D1D3D4',
      markerLabelFontWeight: PropTypes.string,

      intervalColor: '4DC0E8',

      legendWidth: 300,
      legendBubbleArea: 150,
      legendLabelFontFamily: 'Lato',
      legendLabelFontSize: '13px',
      legendLabelFontColor: 'black',
      legendLabelFontWeight: 'normal',  
      legendCaptionFontFamily: 'Lato',
      legendCaptionFontSize: '13px',
      legendCaptionFontColor: 'black',
      legendCaptionFontWeight: 'normal',  

    };
  },

	componentDidMount() {
	   renderLineChart(this.container, this.props);
	},

	componentDidUpdate() {
    renderLineData(this.container, this.props);
	},

  render() {
    return(
      <div className="line-chart" ref={ref => this.container = ref}>
        <svg height={this.props.chartHeight}/>
      </div>
    );
  }
});

module.exports = LineChart


const renderLineChart = (container, options) => {
  const width = options.chartWidth;

  let canvas = d3.select(container).select("svg")
    .attr("width", width) // | container.parentElement.offsetWidth- 20

  canvas
    .append('g')
    .attr("class", "conf-interval")

  canvas
    .append("g")
    .attr("class", "x axis")

	canvas
    .append("g")
	  .attr("class", "y axis")

  canvas
    .append('g')
   .attr("class", "trend-lines")

  canvas
    .append('g')
    .attr("class", "bubbles")    

  canvas
    .append('g')
    .attr("class", "markers")

  canvas
    .append("g")
    .attr("class", "legendColorScale")    

  renderLineData(container, options);
};

const renderLineData = (container, options) => {
  let height = options.chartHeight //- options.marginTop - options.marginBottom;
  const width = options.chartWidth //- options.marginLeft - options.marginRight;

	var parseTime = d3.timeParse(options.timeFormat);

  const dateAdd = (date, interval, units) => {
    var ret = new Date(date);
    switch(interval) {
      case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
      case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
      case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
      case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
      case 'day'    :  ret.setDate(ret.getDate() + units);  break;
      case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
      case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
      case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
      default       :  ret = undefined;  break;
    }
    return ret;
  }

  if (options.xCustomEndDate == null) {
    var xMax = d3.max([d3.max(options.data.map(d => parseTime(d[options.xColumn])))])
    } else {
    var xMax = parseTime(options.xCustomEndDate)
    }
  if (options.xCustomStartDate == null) {
    var xMin = d3.min([d3.min(options.data.map(d => parseTime(d[options.xColumn])))])
    } else {
    var xMin = parseTime(options.xCustomStartDate)
    }
  const xScale = d3.scaleTime().nice()
    .domain([dateAdd(xMin,options.xPreTimeInterval,-options.xPreIntervalCount),
             dateAdd(xMax,options.xPostTimeInterval,options.xPostIntervalCount)])
    .range([options.marginLeft + 30 + parseFloat(options.yLabelFontSize), width - options.marginRight]);

  if (options.yColumn.length > 1) {
    xScale
      .range([options.marginLeft + 30 + parseFloat(options.yLabelFontSize), width - options.marginRight - options.legendWidth]);
  }

  var my_data = [];
  for (var i=0; i<options.data.length;i++){
    var new_datum = options.data[i]
    if (parseTime(new_datum[options.xColumn]) <= xMax && parseTime(new_datum[options.xColumn]) >= xMin) {
      my_data.push(new_datum)
    }
  }  

  var yMaxArray = [];
  var yMinArray = [];
  for (var i=0; i<options.yColumn.length; i++) {
    if (options.yCustomMaxValue == null) {
      var yMaxNew = (options.uColumn[i] == null || options.uColumn[i] == 'none') ?
        d3.max([d3.max(my_data.map(d => parseFloat(d[options.yColumn[i]])))]) :
        d3.max([d3.max(my_data.map(d => parseFloat(d[options.uColumn[i]])))])  
    } else {
      var yMaxNew = options.yCustomMaxValue   
    }
    yMaxArray.push(yMaxNew)
    if (options.yCustomMinValue == null) {
      var yMinNew = (options.lColumn[i] == null || options.lColumn[i] == 'none') ?
        d3.min([d3.min(my_data.map(d => parseFloat(d[options.yColumn[i]])))]) :
        d3.min([d3.min(my_data.map(d => parseFloat(d[options.lColumn[i]])))])
    } else {
      var yMinNew = options.yCustomMinValue 
    }
    yMinArray.push(yMinNew)
  }
  var yMax = d3.max(yMaxArray);
  var yMin = d3.min(yMinArray);

  const yScale = d3.scaleLinear()
    .domain([yMin,yMax])
    .range([height-options.marginBottom-parseFloat(options.xTickLabelFontSize)-parseFloat(options.xLabelFontSize)-10, 
            options.marginTop]);

  var xAxis = d3.axisBottom()
    .scale(xScale) 
    .ticks(options.xTickCount) 

  if (options.xTickLabelPosition == 'top') {
    var xAxis = d3.axisTop()
        .scale(xScale)   
  }

  var yAxis = d3.axisLeft()
    .scale(yScale) 
    .ticks(options.yTickCount)

  if (options.yTickLabelPosition == 'right') {
    var yAxis = d3.axisRight()
        .scale(yScale)   
  }

  let canvas = d3.select(container).select("svg");
  canvas.attr("height", height);

  var area = d3.area()
      .curve(d3.curveBasis)
      .x(function(d) { return xScale(parseTime(d[options.xColumn])); })
      .y1(function(d) { return (options.uColumn[i] == null || options.uColumn[i] == 'none') ?
        yScale(parseFloat(d[options.yColumn[i]])) :
        yScale(parseFloat(d[options.uColumn[i]]));})
      .y0(function(d) { return (options.lColumn[i] == null || options.lColumn[i] == 'none') ?
        yScale(parseFloat(d[options.yColumn[i]])) :
        yScale(parseFloat(d[options.lColumn[i]]));})

  var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return xScale(parseTime(d[options.xColumn])); })
        .y(function(d) { return yScale(parseFloat(d[options.yColumn[i]])); });

  for (var i=0; i<options.yColumn.length; i++) {
    canvas.select(".conf-interval")
      .append("path")
      .data([my_data])
      .attr("class","conf-interval")
      .attr("d", area)
      .style("fill", options.intervalColor[i])
      .style("fill-opacity",0.4)

    canvas.select(".trend-lines")
      .append("path")
      .data([my_data])
      .attr("class","trend-lines")
      .attr("d", line)
      .style("fill","none")
      .style("stroke", options.lineStrokeColor[i])
      .style("stroke-width", options.lineStrokeWidth)

    canvas.select(".bubbles")
      .append("g")
      .selectAll("circle")
      .data(my_data)
      .enter()
      .append("circle")
      .attr("class","bubbles")
      .style("fill", options.bubbleFillColor)
      .style("stroke", options.bubbleEdgeColor[i])
      .style("stroke-width", options.bubbleEdgeThickness)
      .attr("cx", d => xScale(parseTime(d[options.xColumn])))
      .attr("cy", d => yScale(parseFloat(d[options.yColumn[i]])))
      .attr("r", options.bubbleRadius)
  }

  canvas.select(".x.axis")
    .attr("transform", "translate(0,"+yScale(yMin)+")")
    .call(xAxis);

  canvas.select(".x.axis")
    .selectAll("text")
    .style("fill", options.xTickLabelFontColor)
    .style("font-size", options.xTickLabelFontSize)
    .style("font-weight", options.xTickLabelFontWeight)
    .style("font-family", options.xTickLabelFontFamily)

  canvas
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", (xScale(xMax)+xScale(xMin))/2.0)
    .attr("y", yScale(yMin) + 10 + parseFloat(options.xTickLabelFontSize) + parseFloat(options.xLabelFontSize))
    .text( (options.xLabelText == null) ? 
        options.xColumn :
        options.xLabelText)
    .style("fill", options.xLabelFontColor)
    .style("font-size", options.xLabelFontSize)
    .style("font-weight", options.xLabelFontWeight)
    .style("font-family", options.xLabelFontFamily)

  canvas.select(".y.axis")
    .attr("transform", "translate("+xScale(dateAdd(xMin,options.xPreTimeInterval,-options.xPreIntervalCount))+",0)")
    .call(yAxis);

  canvas.select(".y.axis")
    .selectAll("text")
    .style("fill", options.yTickLabelFontColor)
    .style("font-size", options.yTickLabelFontSize)
    .style("font-weight", options.yTickLabelFontWeight)
    .style("font-family", options.yTickLabelFontFamily)

  canvas
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform","rotate(-90)")
    .attr("y", xScale(dateAdd(xMin,options.xPreTimeInterval,-options.xPreIntervalCount)) - 35)
    .attr("x", -(yScale(yMax)+yScale(yMin))/2.0)
    .text( (options.yLabelText == null) ?
        options.yColumn :
        options.yLabelText)
    .style("fill", options.yLabelFontColor)
    .style("font-size", options.yLabelFontSize)
    .style("font-weight", options.yLabelFontWeight)
    .style("font-family", options.yLabelFontFamily)

  for (var i=0; i<options.xMarkerPosition.length; i++) {
    canvas
      .append("line")
      .attr("class","markers")
      .attr("y1", yScale(yMin))
      .attr("x1", xScale(parseTime(options.xMarkerPosition[i])))
      .attr("x2", xScale(parseTime(options.xMarkerPosition[i])))
      .attr("y2", yScale(yMax) + 10 + parseFloat(options.markerLabelFontSize))
      .style("stroke", options.markerLineColor)
      .style("stroke-width", options.markerLineWidth)


    canvas
      .append("text")
      .attr("text-anchor","middle")
      .attr("x", xScale(parseTime(options.xMarkerPosition[i])))
      .attr("y", yScale(yMax) + parseFloat(options.markerLabelFontSize))
      .text(options.markerLabelText[i])
      .style("fill", options.markerLabelFontColor)
      .style("font-size", options.markerLabelFontSize)
      .style("font-weight", options.markerLabelFontWeight)
      .style("font-family", options.markerLabelFontFamily)  
  }

  if (options.yColumn.length > 1) {
      canvas
        .append("text")
        .attr("x", xScale(dateAdd(xMax,options.xPostTimeInterval,options.xPostIntervalCount)) + 50 - parseFloat(options.legendLabelFontSize)/2.0)
        .attr("y", yScale(yMax) + parseFloat(options.legendCaptionFontSize))
        .text("Legend")
        .style("fill", options.legendCaptionFontColor)
        .style("font-size", options.legendCaptionFontSize)
        .style("font-weight", options.legendCaptionFontWeight)
        .style("font-family", options.legendCaptionFontFamily)
    
      canvas
        .select(".legendColorScale")
        .selectAll(".legendBubbles")
        .data(options.legendLabelText)
        .enter()
        .append("circle")
        .attr("class","legendBubbles")
        .attr("cx", xScale(dateAdd(xMax,options.xPostTimeInterval,options.xPostIntervalCount)) + 50)
        .attr("cy", (d,i) => yScale(yMax) + parseFloat(options.legendCaptionFontSize) + 20 + i*(10+parseFloat(options.legendLabelFontSize)))
        .attr("r", parseFloat(options.legendLabelFontSize)/2.0)
        .style("fill", (d,i) => options.bubbleEdgeColor[i])
//        .style("fill-opacity", options.bubbleFillOpacity)
    
      canvas
        .select(".legendColorScale")
        .selectAll(".legendLabels")
        .data(options.legendLabelText)
        .enter()
        .append("text")
        .attr("class","legendLabels")
        .attr("text-anchor","start")
        .attr("x", xScale(dateAdd(xMax,options.xPostTimeInterval,options.xPostIntervalCount)) + 50 + 5 + parseFloat(options.legendLabelFontSize)/2.0)
        .attr("y", (d,i) => yScale(yMax) + parseFloat(options.legendCaptionFontSize) + 20 + i*(10+parseFloat(options.legendLabelFontSize)) + parseFloat(options.legendLabelFontSize)/4.0)
        .text(d => d)
        .style("fill", options.legendLabelFontColor)
        .style("font-size", options.legendLabelFontSize)
        .style("font-weight", options.legendLabelFontWeight)
        .style("font-family", options.legendLabelFontFamily)
  }
};

// For testing purposes
LineChart.renderLineChart = renderLineChart;
LineChart.renderLineData = renderLineData;