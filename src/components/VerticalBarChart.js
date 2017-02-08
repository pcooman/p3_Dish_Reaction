const { createClass, PropTypes } = require("react");
const React = require("react");

//import React    from 'react';

const d3 = require("d3");
const _ = require("lodash");

const VerticalBarChart = createClass({
  displayName: "VerticalBarChart",

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
      xTickLabelPosition: 'top',
      xTickLabelFontFamily: 'Lato',
      xTickLabelFontSize: '11px',
      xTickLabelFontColor: 'white',
      xTickLabelFontWeight: 'bold',
      yTickLabelFontFamily: 'Lato',
      yTickLabelFontSize: '11px',
      yTickLabelFontColor: 'black',
      yTickLabelFontWeight: 'normal',
      yTickCount: 5,
      tooltipFontFamily: 'Lato',
      tooltipFontSize: '13px',
      tooltipFontColor: 'black',
      tooltipFontWeight: 'bold'    
    };
  },

  componentDidMount() {
    renderVerticalBarChart(this.container, this.props);
  },

  componentDidUpdate() {
    renderVerticalData(this.container, this.props);
  },

  render() {
    return(
      <div className="vertical-bar-chart" ref={ref => this.container = ref}>
        <svg height={this.props.chartHeight}/>
      </div>
    );
  }
});


module.exports = VerticalBarChart;


const renderVerticalBarChart = (container, options) => {
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

  renderVerticalData(container, options);
};


const renderVerticalData = (container, options) => {
  let height = options.chartHeight;

  const width = options.chartWidth;

  const xScale = d3.scaleBand()
    .domain(options.data.map(d => d[options.xColumn]))
    .rangeRound([options.marginLeft + 35 + parseFloat(options.yLabelFontSize), width-options.marginRight])
    .paddingInner(options.innerPadding)
    .paddingOuter(options.outerPadding);

  if (options.yCustomMaxValue == null) {
    var yMax = d3.max([0,d3.max(options.data.map(d => parseFloat(d[options.yColumn])))])
    } else {
    var yMax = options.yCustomMaxValue   
    }

  if (options.yCustomMinValue == null) {
    var yMin = d3.min([0,d3.min(options.data.map(d => parseFloat(d[options.yColumn])))])
    } else {
    var yMin = options.yCustomMinValue 
    debugger;  
    }

  const yScale = d3.scaleLinear()
    .domain([yMin,yMax])
    .range([height-options.marginBottom, options.marginTop]);

  var xAxis = d3.axisBottom()
    .scale(xScale)  

  if (options.xTickLabelPosition == 'top') {
    var xAxis = d3.axisTop()
        .scale(xScale)   
  }

  var yAxis = d3.axisLeft()
    .scale(yScale) 
    .ticks(options.yTickCount)

  let canvas = d3.select(container).select("svg");

  canvas.attr("height", height);

  canvas.select(".background-bars")
    .selectAll("rect")
    .data(options.data)
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr("x", d => xScale(d[options.xColumn]))
    .attr("y", options.marginTop)
    .style("fill", options.background_bar_color)
    .attr("height", height-options.marginTop-options.marginBottom);

  let bars = canvas
    .select(".bars")
    .selectAll("rect")
    .data(options.data);

  bars
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .style("fill", (d, i) => {
      if(options.fillColorFn) {
        return options.fillColorFn(d, i);
      }
      return parseFloat(d[options.yColumn]) > 0 ? 
        options.fillColorPos :
        options.fillColorNeg;
    })
    .attr("x", d => xScale(d[options.xColumn]))
    .attr("y", yScale(0))
    .attr("height", 0)
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("y", (d) => {
        return parseFloat(d[options.yColumn]) >= 0 ? 
        yScale(parseFloat(d[options.yColumn])) :
        yScale(0);
        })

    .attr("height", (d) => {
        return parseFloat(d[options.yColumn]) >= 0 ? 
        yScale(0) - yScale(parseFloat(d[options.yColumn])) :
        yScale(parseFloat(d[options.yColumn])) - yScale(0);
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
    .text( d => parseFloat(d[options.yColumn]))
    .attr("text-anchor", "middle")
    .attr("x", d => xScale(d[options.xColumn]) + xScale.bandwidth() / 2.0)
    .attr("y", (d) => {
        if (parseFloat(d[options.yColumn]) >= 0) {
            return 3 + yScale(0);
        } else {
            return 3 + parseFloat(options.tooltipFontSize) + yScale(0);
        }
    })
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("y", (d) => {
        if (parseFloat(d[options.yColumn]) >= 0) {
            return 3 + yScale(parseFloat(d[options.yColumn])) + parseFloat(options.tooltipFontSize);
        } else {
            return -3 + yScale(parseFloat(d[options.yColumn]));            
        }
    })
    .style("fill", options.tooltipFontColor)
    .style("font-size", options.tooltipFontSize)
    .style("font-weight", options.tooltipFontWeight)
    .style("font-family", options.tooltipFontFamily)

  canvas.select(".x.axis")
    .attr("transform", "translate(0,"+yScale(0)+")")
    .call(xAxis);

  canvas.select(".x.axis")
    .selectAll("text")
    .style("fill", options.xTickLabelFontColor)
    .style("font-size", options.xTickLabelFontSize)
    .style("font-weight", options.xTickLabelFontWeight)
    .style("font-family", options.xTickLabelFontFamily)

  d3.selectAll(".tick line").remove()

  canvas.select(".y.axis")
    .attr("transform", "translate("+(options.marginLeft+35+parseFloat(options.yLabelFontSize))+",0)")
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
    .attr("y", options.marginLeft + 20)
    .attr("x", -(yScale(yMax) + yScale(yMin)/2.0))
    .text( (options.yLabelText == null) ?
        options.yColumn :
        options.yLabelText)
    .style("fill", options.yLabelFontColor)
    .style("font-size", options.yLabelFontSize)
    .style("font-weight", options.yLabelFontWeight)
    .style("font-family", options.yLabelFontFamily)

};

// For testing purposes
VerticalBarChart.renderVerticalBarChart = renderVerticalBarChart;
VerticalBarChart.renderVerticalData = renderVerticalData;