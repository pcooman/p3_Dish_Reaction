const { createClass, PropTypes } = require("react");
const React = require("react");

//import React    from 'react';

const d3 = require("d3");
const _ = require("lodash");

const HorizontalBarChart = createClass({
  displayName: "HorizontalBarChart",

  propTypes: {
    data: PropTypes.array.isRequired,
    xColumn: PropTypes.string.isRequired,
    yColumn: PropTypes.string.isRequired,

    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,

    background_bar_color: PropTypes.string,

    outerPadding: PropTypes.number,
    innerPadding: PropTypes.number,

    fillColorPos: PropTypes.string, // will fall back to fillColor if fillColorFn === undefined
    fillColorNeg: PropTypes.string,
    fillColorFn: PropTypes.func,

    tooltipFontFamily: PropTypes.string,
    tooltipFontSize: PropTypes.string,
    tooltipFontColor: PropTypes.string ,
    tooltipFontWeight: PropTypes.string, 

    xLabelText: PropTypes.string,
    xLabelFontFamily: PropTypes.string,
    xLabelFontSize: PropTypes.string,
    xLabelFontColor: PropTypes.string,
    xLabelFontWeight: PropTypes.string,

    xTickLabelPosition: PropTypes.string,
    xTickLabelFontFamily: PropTypes.string,
    xTickLabelFontSize: PropTypes.string,
    xTickLabelFontColor: PropTypes.string ,
    xTickLabelFontWeight: PropTypes.string,

    yTickLabelFontFamily: PropTypes.string,
    yTickLabelFontSize: PropTypes.string,
    yTickLabelFontColor: PropTypes.string ,
    yTickLabelFontWeight: PropTypes.string,
    yTickCount: PropTypes.number,
    yCustomMaxValue: PropTypes.number,
    yCustomMinValue: PropTypes.number
  },

  getDefaultProps() {
    return {
      background_bar_color: '#F4F4F4',
      outerPadding: 0,
      innerPadding: 0.05,
      fillColorPos: "#0194D3",
      fillColorNeg: "#F4A800",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 30,
      marginBottom: 30,
      chartHeight: 500,
      chartWidth: 500,
      yTickLabelPosition: 'left',
      yTickLabelFontFamily: 'Lato',
      yTickLabelFontSize: '11px',
      yTickLabelFontColor: 'white',
      yTickLabelFontWeight: 'bold',
      xLabelFontFamily: 'Lato',
      xLabelFontSize: '13px',
      xLabelFontColor: 'black',
      xLabelFontWeight: 'bold',
      xTickLabelFontFamily: 'Lato',
      xTickLabelFontSize: '11px',
      xTickLabelFontColor: 'black',
      xTickLabelFontWeight: 'normal',
      xTickCount: 5,
      tooltipFontFamily: 'Lato',
      tooltipFontSize: '13px',
      tooltipFontColor: 'black',
      tooltipFontWeight: 'bold'    
    };
  },

  componentDidMount() {
    renderHorizontalBarChart(this.container, this.props);
  },

  componentDidUpdate() {
    renderHorizontalData(this.container, this.props);
  },

  render() {
    return(
      <div className="horizontal-bar-chart" ref={ref => this.container = ref}>
        <svg height={this.props.chartHeight}/>
      </div>
    );
  }
});


module.exports = HorizontalBarChart;


const renderHorizontalBarChart = (container, options) => {
  const width = options.chartWidth;

  let canvas = d3.select(container).select("svg")
    .attr("width", width);

  canvas
    .append("g")
    .attr("class", "background-bars");

  canvas
    .append("g")
    .attr("class", "bars");

  canvas
    .append("g")
    .attr("class", "x axis")

  canvas
    .append("g")
    .attr("class", "y axis")

  renderHorizontalData(container, options);
};


const renderHorizontalData = (container, options) => {
  let height = options.chartHeight;

  const width = options.chartWidth;

  const yScale = d3.scaleBand()
    .domain(options.data.map(d => d[options.yColumn]))
    .rangeRound([options.marginTop, height-options.marginBottom])
    .paddingInner(options.innerPadding)
    .paddingOuter(options.outerPadding);

  if (options.xTickLabelPosition == 'top') {
    yScale
        .rangeRound([options.marginTop + parseFloat(options.xTickLabelFontSize) + 10 + parseFloat(options.xLabelFontSize), height-options.marginBottom])
  } else {
    yScale
        .rangeRound([options.marginTop, height-options.marginBottom - parseFloat(options.xTickLabelFontSize) - 10 - parseFloat(options.xLabelFontSize)])
  }

  if (options.xCustomMaxValue == null) {
    var xMax = d3.max([0,d3.max(options.data.map(d => parseFloat(d[options.xColumn])))])
    } else {
    var xMax = options.xCustomMaxValue   
    }

  if (options.xCustomMinValue == null) {
    var xMin = d3.min([0,d3.min(options.data.map(d => parseFloat(d[options.xColumn])))])
    } else {
    var xMin = options.xCustomMinValue 
    }

  const xScale = d3.scaleLinear()
    .domain([xMin,xMax])
    .range([options.marginLeft, width - options.marginRight]);

  var yAxis = d3.axisLeft()
    .scale(yScale)  

  if (options.yTickLabelPosition == 'right') {
    var yAxis = d3.axisRight()
        .scale(yScale)   
  }

  var xAxis = d3.axisTop()
    .scale(xScale) 
    .ticks(options.xTickCount)

  if (options.xTickLabelPosition == 'bottom') {
      var xAxis = d3.axisBottom()
        .scale(xScale) 
        .ticks(options.xTickCount)
  }


  let canvas = d3.select(container).select("svg");

  canvas.attr("height", height);

  canvas.select(".background-bars")
    .selectAll("rect")
    .data(options.data)
    .enter()
    .append("rect")
    .attr("height", yScale.bandwidth())
    .attr("y", d => yScale(d[options.yColumn]))
    .attr("x", options.marginLeft)
    .style("fill", options.background_bar_color)
    .attr("width", width-options.marginLeft-options.marginRight);

  let bars = canvas
    .select(".bars")
    .selectAll("rect")
    .data(options.data);

  bars
    .enter()
    .append("rect")
    .attr("height", yScale.bandwidth())
    .style("fill", (d, i) => {
      if(options.fillColorFn) {
        return options.fillColorFn(d, i);
      }
      return parseFloat(d[options.xColumn]) > 0 ? 
        options.fillColorPos :
        options.fillColorNeg;
    })
    .attr("y", d => yScale(d[options.yColumn]))
    .attr("x", xScale(0))
    .attr("width", 0)
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("x", (d) => {
        return parseFloat(d[options.xColumn]) >= 0 ? 
        xScale(0):
        xScale(parseFloat(d[options.xColumn]));
        })

    .attr("width", (d) => {
        return parseFloat(d[options.xColumn]) >= 0 ? 
        xScale(parseFloat(d[options.xColumn])) - xScale(0) :
        xScale(0)-xScale(parseFloat(d[options.xColumn]));
        })

  bars
    .exit()
    .remove();

  let tooltips = canvas
    .select(".bars")
    .selectAll("text")
    .data(options.data);

  tooltips
    .enter()
    .append("text")
    .text( d => parseFloat(d[options.xColumn]))
    .style("fill", options.tooltipFontColor)
    .style("font-size", options.tooltipFontSize)
    .style("font-weight", options.tooltipFontWeight)
    .style("font-family", options.tooltipFontFamily)
    .attr("text-anchor", (d) => {
        if (parseFloat(d[options.xColumn]) >= 0) {
        return 'end';
        } else {
        return 'start';
        }
    })
    .attr("y", d => yScale(d[options.yColumn]) + yScale.bandwidth() / 2.0 + parseFloat(options.tooltipFontSize) / 2.0)
    .attr("x", (d) => {
        if (parseFloat(d[options.xColumn]) >= 0) {
        return -3 + xScale(0);      
        } else {
        return 3 + xScale(0);      
        }    
    })
    .transition()
    .duration(500)
    .ease(d3.easeLinear)    
    .attr("x", (d) => {
        if (parseFloat(d[options.xColumn]) >= 0) {
            return -3 + xScale(parseFloat(d[options.xColumn]));
        } else {
              return 3 + xScale(parseFloat(d[options.xColumn]))
        }
    })

  canvas.select(".y.axis")
    .attr("transform", "translate("+xScale(0)+",0)")
    .call(yAxis);

  canvas.select(".y.axis")
    .selectAll("text")
    .style("fill", options.yTickLabelFontColor)
    .style("font-size", options.yTickLabelFontSize)
    .style("font-weight", options.yTickLabelFontWeight)
    .style("font-family", options.yTickLabelFontFamily)

  d3.selectAll(".tick line").remove()

  canvas.select(".x.axis")
    .attr("transform", options.xTickLabelPosition == 'top' ? 
            "translate(0,"+(options.marginTop+parseFloat(options.xTickLabelFontSize) + 10 + parseFloat(options.xLabelFontSize))+")" :
            "translate(0,"+(height-options.marginBottom - parseFloat(options.xTickLabelFontSize) - 10 - parseFloat(options.xLabelFontSize))+")")
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
    .attr("x", (xScale(xMax) + xScale(xMin))/2.0)
    .attr("y", options.xTickLabelPosition == 'top' ?
        options.marginTop + parseFloat(options.xTickLabelFontSize) :
        height - options.marginBottom)
    .text( (options.xLabelText == null) ? 
        options.xColumn :
        options.xLabelText)
    .style("fill", options.xLabelFontColor)
    .style("font-size", options.xLabelFontSize)
    .style("font-weight", options.xLabelFontWeight)
    .style("font-family", options.xLabelFontFamily)
};

// For testing purposes
HorizontalBarChart.renderHorizontalBarChart = renderHorizontalBarChart;
HorizontalBarChart.renderHorizontalData = renderHorizontalData;