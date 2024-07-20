import React, {useState} from "react";
import ApexCharts from "apexcharts";
import Chart from 'react-apexcharts';

const PropostasChart = () => {
    const options = {
      labels: ['Enviadas', 'Aceitas', 'Pendentes'],
      colors: ['#4C7ECF', '#3cbc8c', '#FF6F61'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 100
          },
          legend: {
            position: 'bottom',

          },
        }
      }]
      
    };
  
    const series = [44, 55, 13];
  
    return (
      <div>
        <Chart 
          options={options}
          series={series}
          type="pie"
          width="330"
          
        />
      </div>
    );
  };
  
  export default PropostasChart;