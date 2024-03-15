import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ForecastC = () => {
  useEffect(() => {
    
    const actualData = [
      { x: 2010, y: 43934 },
      { x: 2011, y: 48656 },
      { x: 2012, y: 65165 },
      { x: 2013, y: 81827 },
      { x: 2014, y: 112143 },
      { x: 2015, y: 142383 },
      { x: 2016, y: 171533 },
      { x: 2016.5, y: 171633 },
      
       
    ];

    const forecastingData = [
      { x: 2016.5, y: 171633 },  
      { x: 2017, y: 165174 },
      { x: 2018, y: 155157 },
      { x: 2019, y: 161454 },
      { x: 2020, y: 154610 },  
      { x: 2020.5, y: 160000 }, // Adjust with your forecasting values
      { x: 2021, y: 165000 },
      { x: 2022, y: 170000 },
      // Add more forecasting data points as needed
    ];

    // Find the index where forecasting starts (e.g., after 2020)
    const forecastingStartIndex = actualData.findIndex(dataPoint => dataPoint.x === 2016);

    // Separate actual and forecasting data
    const actualSeries = actualData.slice(0, forecastingStartIndex + 2); // Include the duplicated point
    const forecastingSeries = forecastingData.map(dataPoint => ({ ...dataPoint, isForecast: true }));

    // Initialize the chart
    Highcharts.chart('container', {
      title: {
        text: 'Projection',
        align: 'left',
      },
      yAxis: {
        title: {
          text: 'CO2 Emission',
        },
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2023', // Adjust the range description as needed
        },
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'center',
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },
      series: [
        {
          name: 'Live',
          data: actualSeries,
          color: 'orange',
        },
        {
          name: 'Forecasting',
          data: forecastingSeries,
          dashStyle: 'Dash', // Make the line dotted for forecasting data
          color: 'blue',
        },
      ],
    });
  }, []);

  return <div id="container" style={{ width: '100%', height: '400px' }} />;
};

export default ForecastC;
