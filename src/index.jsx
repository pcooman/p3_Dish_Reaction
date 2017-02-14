// unfinished/src/index.jsx
import './main.css';
const React = require("react");
import ReactDOM from 'react-dom';
import Chart    from './components/chart.jsx';

const VerticalBarChart = require("./components/VerticalBarChart.js");
const HorizontalBarChart = require("./components/HorizontalBarChart.js");
const BubbleChart = require("./components/BubbleChart.js");
const LineChart = require("./components/LineChart.js");



var chartType = 'Line' // 'Bubble' or 'Horizontal' or 'Vertical' or 'Line'

const mountingPoint = document.createElement('div');
mountingPoint.className = 'react-app';
document.body.appendChild(mountingPoint);

// Vertical Bar Chart ---------------------------------------------

if (chartType == 'Vertical') {

    var data = require('dsv!../data/bar_data.csv');
    
    var optionsVertical = {
        // specify inputs
        data: data,
        xColumn: 'name',
        yColumn: 'value',
    
        // window size
        chartWidth: 600,
        chartHeight: 500,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        marginBottom: 30,
    
    
        // background bars
        background_bar_color: '#F4F4F4',
    
        // bars
        outerPadding: 0,
        innerPadding: 0.05,
        fillColorPos: "#0194D3",
        fillColorNeg: "#F4A800",
    //    fillColorFn: PropTypes.func
    
        // X axis
        xTickLabelPosition: 'bottom',
        xTickLabelFontFamily: 'Lato',
        xTickLabelFontSize: '11px',
        xTickLabelFontColor: 'black',
        xTickLabelFontWeight: 'normal',
    
        // Y axis
        yLabelText: 'Value',
        yLabelFontFamily: 'Lato',
        yLabelFontSize: '13px',
        yLabelFontColor: 'black',
        yLabelFontWeight: 'bold',
    
        yTickLabelFontFamily: 'Lato',
        yTickLabelFontSize: '11px',
        yTickLabelFontColor: 'black',
        yTickLabelFontWeight: 'normal',
        yTickCount: 5,
    //    yCustomMaxValue: 50,
    //    yCustomMinValue: -30,
    
        // tooltips
        tooltipFontFamily: 'Lato',
        tooltipFontSize: '13px',
        tooltipFontColor: 'white',
        tooltipFontWeight: 'bold'  
    }

    ReactDOM.render(
        <VerticalBarChart 
            {...optionsVertical}
        />, mountingPoint);
}

// Horizontal Bar Chart -------------------------------------------------------

if (chartType == 'Horizontal') {
    var data = require('dsv!../data/bar_data.csv');

    var optionsHorizontal = {
        // specify inputs
        data: data,
        yColumn: 'name',
        xColumn: 'value',
    
        // window size
        chartWidth: 600,
        chartHeight: 500,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        marginBottom: 30,
    
    
        // background bars
        background_bar_color: '#F4F4F4',
    
        // bars
        outerPadding: 0,
        innerPadding: 0.05,
        fillColorPos: "#0194D3",
        fillColorNeg: "#F4A800",
    //    fillColorFn: PropTypes.func
    
        // Y axis
        yTickLabelPosition: 'left',
        yTickLabelFontFamily: 'Lato',
        yTickLabelFontSize: '11px',
        yTickLabelFontColor: 'black',
        yTickLabelFontWeight: 'normal',
    
        // X axis
        xLabelText: 'Value',
        xLabelFontFamily: 'Lato',
        xLabelFontSize: '13px',
        xLabelFontColor: 'black',
        xLabelFontWeight: 'bold',
    
        xTickLabelPosition: 'bottom',
        xTickLabelFontFamily: 'Lato',
        xTickLabelFontSize: '11px',
        xTickLabelFontColor: 'black',
        xTickLabelFontWeight: 'normal',
        xTickCount: 5,
    //    xCustomMaxValue: 30,
    //    xCustomMinValue: -25,
    
        // tooltips
        tooltipFontFamily: 'Lato',
        tooltipFontSize: '13px',
        tooltipFontColor: 'white',
        tooltipFontWeight: 'bold'  
    }
    
    ReactDOM.render(
        <HorizontalBarChart 
            {...optionsHorizontal}
        />, mountingPoint);
}

// Bubble Plot ----------------------------------------------------------------

if (chartType == 'Bubble') {
    var data = require('dsv!../data/iris.csv');
    var optionsBubble = {
        // specify inputs
        data: data,
        xColumn: 'sepal_length',
        yColumn: 'sepal_width',
        aColumn: 'petal_length',
        cColumn: 'class',
    
        // window size
        chartWidth: 900,
        chartHeight: 500,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        marginBottom: 50,
    
        // legend
        legendWidth: 300,
        legendBubbleArea: 75,
        legendLabelFontFamily: 'Lato',
        legendLabelFontSize: '13px',
        legendLabelFontColor: 'black',
        legendLabelFontWeight: 'normal',
        legendCaptionFontFamily: 'Lato',
        legendCaptionFontSize: '15px',
        legendCaptionFontColor: 'black',
        legendCaptionFontWeight: 'bold',
    
        // circles
    //    fillColorFn: PropTypes.func,
    
        // Y axis
        yAxisPosition: 5,
    
        yLabelText: 'Sepal Width',
        yLabelFontFamily: 'Lato',
        yLabelFontSize: '13px',
        yLabelFontColor: 'black',
        yLabelFontWeight: 'bold',
    
        yTickLabelPosition: 'left',
        yTickLabelFontFamily: 'Lato',
        yTickLabelFontSize: '11px',
        yTickLabelFontColor: 'black',
        yTickLabelFontWeight: 'normal',
        yTickCount: 5,
    //    yCustomMaxValue: 10,
    //    yCustomMinValue: 0,
    
        // X axis
        xAxisPosition: 3,
    
        xLabelText: 'Sepal Length',
        xLabelFontFamily: 'Lato',
        xLabelFontSize: '13px',
        xLabelFontColor: 'black',
        xLabelFontWeight: 'bold',
    
        xTickLabelPosition: 'bottom',
        xTickLabelFontFamily: 'Lato',
        xTickLabelFontSize: '11px',
        xTickLabelFontColor: 'black',
        xTickLabelFontWeight: 'normal',
        xTickCount: 5,
    //    xCustomMaxValue: 10,
    //    xCustomMinValue: 0,
    
        // Area axis
        aCaptionText: 'Petal Width',
        aCustomMinArea: 75,
        aCustomMaxArea: 1200,

        // Color axis
        cCaptionText: 'Iris Species',
    
        // Bubbles
        bubbleDefaultColor: '#0194D3',
        bubbleFillOpacity: 0.5,
        bubbleEdgeThickness: 3,
        bubbleEdgeColor: 'white',
    //    bubbleColorPalette: ['red','green','blue']
    }

    ReactDOM.render(
        <BubbleChart 
            {...optionsBubble}
        />, mountingPoint);
}

// Line Chart ----------------------------------------------------------------

if (chartType == 'Line') {
    var data = require('dsv!../data/time_series.csv');
    var optionsLine = {
        // specify inputs
        data: data,
        xColumn: 'time',
        yColumn: ['pointpred','response'],
        lColumn: ['pointpredlower','none'],
        uColumn: ['pointpredupper','none'],
        timeFormat: '%Y-%m-%d',
    
        // window size
        chartWidth: 1200,
        chartHeight: 500,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        marginBottom: 50,

        // Y axis    
        yLabelText: 'Value',
        yLabelFontFamily: 'Lato',
        yLabelFontSize: '13px',
        yLabelFontColor: 'black',
        yLabelFontWeight: 'bold',
    
        yTickLabelPosition: 'left',
        yTickLabelFontFamily: 'Lato',
        yTickLabelFontSize: '11px',
        yTickLabelFontColor: 'black',
        yTickLabelFontWeight: 'normal',
        yTickCount: 5,
    //   yCustomMaxValue: 130,
    //   yCustomMinValue: 80,
    
        // X axis    
        xLabelText: 'Time',
        xLabelFontFamily: 'Lato',
        xLabelFontSize: '13px',
        xLabelFontColor: 'black',
        xLabelFontWeight: 'bold',
    
        xTickLabelPosition: 'bottom',
        xTickLabelFontFamily: 'Lato',
        xTickLabelFontSize: '11px',
        xTickLabelFontColor: 'black',
        xTickLabelFontWeight: 'normal',
        xTickCount: 5,
        xCustomEndDate: '2014-04-02',
        xCustomStartDate: '2014-03-02',

        xPreTimeInterval: 'day',
        xPreIntervalCount: 3,
        xPostTimeInterval: 'day',
        xPostIntervalCount: 3,

        // Bubbles
        bubbleRadius: 4,
        bubbleFillColor: 'white',
        bubbleEdgeColor: ["#006082",'red'],
        bubbleEdgeThickness: 3,

        // Trend line
        lineStrokeColor: ["#006082",'red'],
        lineStrokeWidth: 3,

        // Marker lines
        xMarkerPosition: ['2014-03-10','2014-03-30'],
        markerLineColor: 'D1D3D4',
        markerLineWidth: 2,
        markerLabelText: ['Start Intervention','End Intervention'],
        markerLabelFontFamily: 'Lato',
        markerLabelFontSize: '11px',
        markerLabelFontColor: '#D1D3D4',
        markerLabelFontWeight: 'normal',        

        intervalColor: ["4DC0E8",'none'],

        legendWidth: 300,
        legendBubbleArea: 150,
        legendLabelText: ['Counterfactual','Measured Trend'],
        legendLabelFontFamily: 'Lato',
        legendLabelFontSize: '13px',
        legendLabelFontColor: 'black',
        legendLabelFontWeight: 'normal', 
        legendCaptionText: 'Trends', 
        legendCaptionFontFamily: 'Lato',
        legendCaptionFontSize: '13px',
        legendCaptionFontColor: 'black',
        legendCaptionFontWeight: 'normal',  
    }

    ReactDOM.render(
        <LineChart 
            {...optionsLine}
        />, mountingPoint);
}