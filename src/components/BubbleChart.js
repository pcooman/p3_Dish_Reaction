const { createClass, PropTypes } = require("react");
const React = require("react");

//import React    from 'react';

const d3 = require("d3");
const _ = require("lodash");

const BubbleChart = createClass({
  displayName: "BubbleChart",

  propTypes: {
    data: PropTypes.array.isRequired,
    xColumn: PropTypes.string.isRequired,
    yColumn: PropTypes.string.isRequired,
    aColumn: PropTypes.string,
    cColumn: PropTypes.string,

    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,

    legendWidth: PropTypes.number,
    legendBubbleArea: PropTypes.number,
    legendLabelFontFamily: PropTypes.string,
    legendLabelFontSize: PropTypes.string,
    legendLabelFontColor: PropTypes.string,
    legendLabelFontWeight: PropTypes.string,
    legendCaptionFontFamily: PropTypes.string,
    legendCaptionFontSize: PropTypes.string,
    legendCaptionFontColor: PropTypes.string,
    legendCaptionFontWeight: PropTypes.string,

    fillColorFn: PropTypes.func,

    xAxisPosition: PropTypes.number,
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
    xCustomMaxValue: PropTypes.number,
    xCustomMinValue: PropTypes.number,

    yAxisPosition: PropTypes.number,
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

    aLabelText: PropTypes.string,
    aCustomMaxArea: PropTypes.number,
    aCustomMinArea: PropTypes.number,

    cLabelText: PropTypes.string,

    bubbleDefaultArea: PropTypes.number,
    bubbleDefaultColor: PropTypes.string,
    bubbleFillOpacity: PropTypes.number,
    bubbleEdgeThickness: PropTypes.number,
    bubbleEdgeColor: PropTypes.string,
    bubbleColorPalette: PropTypes.array
  },

  getDefaultProps() {
    return {
      chartHeight: 500,
      chartWidth: 500,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 30,
      marginBottom: 30,
      legendWidth: PropTypes.number,
      legendBubbleArea: 150,
      legendLabelFontFamily: 'Lato',
      legendLabelFontSize: '13px',
      legendLabelFontColor: 'black',
      legendLabelFontWeight: 'normal',  
      legendCaptionFontFamily: 'Lato',
      legendCaptionFontSize: '13px',
      legendCaptionFontColor: 'black',
      legendCaptionFontWeight: 'normal',          
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
      aCustomMaxArea: 75,
      aCustomMinArea: 1200,
      bubbleDefaultArea: 75,
      bubbleDefaultColor: "#0194D3",
      bubbleFillOpacity: 0.5,
      bubbleEdgeThickness: 3,
      bubbleEdgeColor: 'white',
      bubbleColorPalette: ["#0194D3", "#FFC525", "#49DEA4", "#F77552", "#86518D", "#BF8669", "#86CFEB", "#FCDC95", "#C5E5D4", "#FFCBC2", "#C9B2CE", "#E7CBA9"]
    };
  },

  componentDidMount() {
    renderBubbleChart(this.container, this.props);
  },

  componentDidUpdate() {
    renderBubbleData(this.container, this.props);
  },

  render() {
    return(
      <div className="bubble-chart" ref={ref => this.container = ref}>
        <svg height={this.props.chartHeight}/>
      </div>
    );
  }
});


module.exports = BubbleChart;


const renderBubbleChart = (container, options) => {
  const width = options.chartWidth;

  let canvas = d3.select(container).select("svg")
    .attr("width", width);

  canvas
    .append("g")
    .attr("class", "bubbles");

  canvas
    .append("g")
    .attr("class", "x axis")

  canvas
    .append("g")
    .attr("class", "y axis")

  canvas
    .append("g")
    .attr("class", "legendColorScale")

  canvas
    .append("g")
    .attr("class", "legendAreaScale")

  renderBubbleData(container, options);
};


const renderBubbleData = (container, options) => {
  let height = options.chartHeight;

  const width = options.chartWidth;

  if (options.xCustomMaxValue == null) {
    var xMax = d3.max([d3.max(options.data.map(d => parseFloat(d[options.xColumn])))])
    } else {
    var xMax = options.yCustomMaxValue   
    }
  if (options.xCustomMinValue == null) {
    var xMin = d3.min([d3.min(options.data.map(d => parseFloat(d[options.xColumn])))])
    } else {
    var xMin = options.xCustomMinValue 
    }
  const xScale = d3.scaleLinear()
    .domain([xMin,xMax])
    .range([options.marginLeft + 30 + parseFloat(options.yLabelFontSize), width - options.marginRight]);

  if (options.yCustomMaxValue == null) {
    var yMax = d3.max([d3.max(options.data.map(d => parseFloat(d[options.yColumn])))])
    } else {
    var yMax = options.yCustomMaxValue   
    }
  if (options.yCustomMinValue == null) {
    var yMin = d3.min([d3.min(options.data.map(d => parseFloat(d[options.yColumn])))])
    } else {
    var yMin = options.yCustomMinValue 
    }
  const yScale = d3.scaleLinear()
    .domain([yMin,yMax])
    .range([height-options.marginBottom-parseFloat(options.xTickLabelFontSize)-parseFloat(options.xLabelFontSize)-10, 
            options.marginTop]);

  var aMax = d3.max([d3.max(options.data.map(d => parseFloat(d[options.aColumn])))])
  var aMin = d3.min([d3.min(options.data.map(d => parseFloat(d[options.aColumn])))])

  const aScale = d3.scaleLinear()
    .domain([aMin,aMax])
    .range([options.aCustomMinArea, options.aCustomMaxArea]);

  var classes = (options.cColumn == null) ? 
    [] :
    _.uniq((options.data).map(d => d[options.cColumn]));

  const cScale = d3.scaleOrdinal()
      .domain(classes)
      .range(options.bubbleColorPalette.slice(0,classes.length));

  if (options.cColumn != null || options.aColumn != null) {
      xScale
        .range([options.marginLeft + 30 + parseFloat(options.yLabelFontSize), width - options.marginRight - options.legendWidth])    
  }

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

  canvas.select(".bubbles")
    .selectAll("circle")
    .data(options.data)
    .enter()
    .append("circle")
    .style("fill", d => (options.cColumn == null) ? 
            options.bubbleDefaultColor :
            cScale(d[options.cColumn]))
    .style("fill-opacity", options.bubbleFillOpacity)
    .style("stroke", options.bubbleEdgeColor)
    .style("stroke-width", options.bubbleEdgeThickness)
    .attr("cx", d => xScale(parseFloat(d[options.xColumn])))
    .attr("r", 5)
    .attr("cy", yScale(options.xAxisPosition))
    .transition()
    .duration(1000)
    .attr("cy", d => yScale(parseFloat(d[options.yColumn])))
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("r", d => (options.aColumn == null) ? 
            Math.sqrt(options.bubbleDefaultArea/Math.PI) :
            Math.sqrt(aScale(parseFloat(d[options.aColumn]))/Math.PI))

  canvas.select(".x.axis")
    .attr("transform", options.xAxisPosition == null ? 
            "translate(0,"+yScale(yMin)+")" :
            "translate(0,"+yScale(options.xAxisPosition)+")")
    .call(xAxis);

  canvas.select(".x.axis")
    .selectAll("text")
    .style("fill", options.xTickLabelFontColor)
    .style("font-size", options.xTickLabelFontSize)
    .style("font-weight", options.xTickLabelFontWeight)
    .style("font-family", options.xTickLabelFontFamily)

  canvas
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", xScale(xMax))
    .attr("y", options.xAxisPosition == null ?
        yScale(yMin) + 10 + parseFloat(options.xTickLabelFontSize) + parseFloat(options .xLabelFontSize) :
        yScale(options.xAxisPosition) + 10 + parseFloat(options.xTickLabelFontSize) + parseFloat(options.xLabelFontSize))
    .text( (options.xLabelText == null) ? 
        options.xColumn :
        options.xLabelText)
    .style("fill", options.xLabelFontColor)
    .style("font-size", options.xLabelFontSize)
    .style("font-weight", options.xLabelFontWeight)
    .style("font-family", options.xLabelFontFamily)

  canvas.select(".y.axis")
    .attr("transform", options.yAxisPosition == null ?
            "translate("+xScale(xMin)+",0)" :
            "translate("+xScale(options.yAxisPosition)+",0)")
    .call(yAxis);

  canvas.select(".y.axis")
    .selectAll("text")
    .style("fill", options.yTickLabelFontColor)
    .style("font-size", options.yTickLabelFontSize)
    .style("font-weight", options.yTickLabelFontWeight)
    .style("font-family", options.yTickLabelFontFamily)

  canvas
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform","rotate(-90)")
    .attr("y", options.yAxisPosition == null ?
        xScale(xMin) - 35:
        xScale(options.yAxisPosition) - 35 )
    .attr("x", -options.marginTop)
    .text( (options.yLabelText == null) ?
        options.yColumn :
        options.yLabelText)
    .style("fill", options.yLabelFontColor)
    .style("font-size", options.yLabelFontSize)
    .style("font-weight", options.yLabelFontWeight)
    .style("font-family", options.yLabelFontFamily)

  if (options.cColumn != null) {
      canvas
        .append("text")
        .attr("x", xScale(xMax) + 50 - parseFloat(options.legendLabelFontSize)/2.0)
        .attr("y", yScale(yMax) + parseFloat(options.legendCaptionFontSize))
        .text(options.cLabelText == null ? 
            "Area Scale: " + options.cColumn :
            "Area Scale: " + options.cLabelText)
        .style("fill", options.legendCaptionFontColor)
        .style("font-size", options.legendCaptionFontSize)
        .style("font-weight", options.legendCaptionFontWeight)
        .style("font-family", options.legendCaptionFontFamily)
    
      canvas.select(".legendColorScale")
        .selectAll(".legendBubbles")
        .data(classes)
        .enter()
        .append("circle")
        .attr("class","legendBubbles")
        .attr("cx", xScale(xMax) + 50)
        .attr("cy", (d,i) => yScale(yMax) + parseFloat(options.legendCaptionFontSize) + 20 + i*(10+parseFloat(options.legendLabelFontSize)))
        .attr("r", parseFloat(options.legendLabelFontSize)/2.0)
        .style("fill", d => cScale(d))
        .style("fill-opacity", options.bubbleFillOpacity)
    
      canvas.select(".legendColorScale")
        .selectAll(".legendLabels")
        .data(classes)
        .enter()
        .append("text")
        .attr("class","legendLabels")
        .attr("text-anchor","start")
        .attr("x", xScale(xMax) + 50 + 5 + parseFloat(options.legendLabelFontSize)/2.0)
        .attr("y", (d,i) => yScale(yMax) + parseFloat(options.legendCaptionFontSize) + 20 + i*(10+parseFloat(options.legendLabelFontSize)) + parseFloat(options.legendLabelFontSize)/4.0)
        .text(d => d)
        .style("fill", options.legendLabelFontColor)
        .style("font-size", options.legendLabelFontSize)
        .style("font-weight", options.legendLabelFontWeight)
        .style("font-family", options.legendLabelFontFamily)
  }

  if (options.aColumn != null) {
      var colorLegendHeight = (options.cColumn == null) ?
        0 :
        parseFloat(options.legendCaptionFontSize) + classes.length*(10+parseFloat(options.legendLabelFontSize) + 10);
    
      var areas = [{area: options.aCustomMinArea, value: aMin},
                    {area: options.aCustomMaxArea, value: aMax}];

      canvas
        .append("text")
        .attr("x", xScale(xMax) + 50 - parseFloat(options.legendLabelFontSize)/2.0)
        .attr("y", yScale(yMax) + + colorLegendHeight + parseFloat(options.legendCaptionFontSize))
        .text(options.aLabelText == null ? 
            "Area Scale: " + options.aColumn :
            "Area Scale: " + options.aLabelText)
        .style("fill", options.legendCaptionFontColor)
        .style("font-size", options.legendCaptionFontSize)
        .style("font-weight", options.legendCaptionFontWeight)
        .style("font-family", options.legendCaptionFontFamily)
    
      canvas.select(".legendAreaScale")
        .selectAll(".legendBubbles")
        .data(areas)
        .enter()
        .append("circle")
        .attr("class","legendBubbles")
        .attr("cx", d => xScale(xMax) + 50 - parseFloat(options.legendLabelFontSize)/2.0 + Math.sqrt(options.aCustomMaxArea/Math.PI))
        .attr("cy", (d,i) => yScale(yMax) + colorLegendHeight + parseFloat(options.legendCaptionFontSize) + 10 + Math.sqrt(options.aCustomMinArea/Math.PI) + i*(Math.sqrt(options.aCustomMaxArea/Math.PI) + 5 + Math.sqrt(options.aCustomMaxArea/Math.PI)))
        .attr("r", d => Math.sqrt(d.area/Math.PI))
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", options.bubbleEdgeThickness)
    
      canvas.select(".legendAreaScale")
        .selectAll(".legendLabels")
        .data(areas)
        .enter()
        .append("text")
        .attr("class","legendLabels")
        .attr("text-anchor","start")
        .attr("x", xScale(xMax) + 50 + 20 + Math.sqrt(options.aCustomMaxArea/Math.PI))
        .attr("y", (d,i) => yScale(yMax) + colorLegendHeight + parseFloat(options.legendCaptionFontSize) + 10 + Math.sqrt(options.aCustomMinArea/Math.PI) + i*(Math.sqrt(options.aCustomMaxArea/Math.PI) + 5 + Math.sqrt(options.aCustomMaxArea/Math.PI)) + parseFloat(options.legendLabelFontSize)/2.0)
        .text(d => +d.value)
        .style("fill", options.legendLabelFontColor)
        .style("font-size", options.legendLabelFontSize)
        .style("font-weight", options.legendLabelFontWeight)
        .style("font-family", options.legendLabelFontFamily)
  }
};

// For testing purposes
BubbleChart.renderBubbleChart = renderBubbleChart;
BubbleChart.renderBubbleData = renderBubbleData;