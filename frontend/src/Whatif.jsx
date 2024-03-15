import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Whatif = () => {
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
      { x: 2018, y: 159157 },
      { x: 2019, y: 161454 },
      { x: 2020, y: 154610 },
      { x: 2020.5, y: 160000 }, 
      { x: 2021, y: 165000 },
      { x: 2022, y: 170000 },
    
    ];

    const whatIfData = [
      { x: 2016.5, y: 171633 },
      { x: 2017, y: 155000 },
      { x: 2018, y: 151000 }, 
      { x: 2019, y: 150454 },
      { x: 2020, y: 148000 },
      { x: 2020.5, y: 145000 }, 
      { x: 2021, y: 155000 },
      { x: 2022, y: 160000 },
     
    ];

    
    const forecastingStartIndex = actualData.findIndex(dataPoint => dataPoint.x === 2016);

    
    const actualSeries = actualData.slice(0, forecastingStartIndex + 2); 
    const forecastingSeries = forecastingData.map(dataPoint => ({ ...dataPoint, isForecast: true }));
    const whatIfSeries = whatIfData.map(dataPoint => ({ ...dataPoint, isWhatIf: true }));

   
    Highcharts.chart('container', {
      title: {
        text: 'What-If Scenario',
        align: 'left',
      },
      yAxis: {
        title: {
          text: 'Co2 Emission',
        },
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2023', 
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
          dashStyle: 'Dash', 
          color: 'blue',
        },
        {
          name: 'What If',
          data: whatIfSeries,
          dashStyle: 'Dash', 
          color: 'green',
        },
      ],
    });
  }, []);

  return <div id="container" style={{ width: '100%', height: '400px' }} />;
};

export default Whatif;
