import React, {useState} from "react";
 
import Chart from 'react-apexcharts';

const PropostasChart = () => {
    const options = {
      labels: ['Enviadas', 'Aceitas', 'Pendentes'],
      colors: ['#4C7ECF', '#3cbc8c', '#FF6F61'],
      legend: {
        position: 'right',
        fontSize: "15px",
      },
      
      
    };
  
    const series = [44, 55, 13];
  
    return (
      <div>
        <Chart 
          options={options}
          series={series}
          type="pie"
          width="320"

        />
      </div>
    );
  };
  
  export default PropostasChart;