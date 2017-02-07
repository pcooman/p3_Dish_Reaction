// unfinished/src/index.jsx
import './main.css';
const React = require("react");
import ReactDOM from 'react-dom';
import Chart    from './components/chart.jsx';

const VerticalBarChart = require("./components/VerticalBarChart.js");
const HorizontalBarChart = require("./components/HorizontalBarChart.js");
const BubbleChart = require("./components/BubbleChart.js");

var chartType = 'Horizontal' // 'Bubble' or 'Horizontal' or 'Vertical'

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
        aLabelText: 'Petal Width',
        aCustomMinArea: 75,
        aCustomMaxArea: 1200,

        // Color axis
        cLabelText: 'Iris Species',
    
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