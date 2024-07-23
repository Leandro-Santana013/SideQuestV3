import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const RevenueChart = () => {
  const [viewType, setViewType] = useState('monthly');

  const getCurrentMonthDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const dates = [];

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day).toISOString().split('T')[0]);
    }

    return dates;
  };

  const getWeeklyDates = () => {
    const now = new Date();
    const dates = [];
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInWeek = 7;

    for (let i = 0; i < 4; i++) {
      const startOfWeek = new Date(startOfMonth);
      startOfWeek.setDate(startOfWeek.getDate() + i * daysInWeek);
      dates.push(startOfWeek.toISOString().split('T')[0]);
    }

    return dates;
  };

  const getYearlyDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const dates = [];

    for (let month = 0; month < 12; month++) {
      dates.push(new Date(year, month, 1).toISOString().split('T')[0]);
    }

    return dates;
  };

  const options = {
    chart: {
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: ['#987bc5', '#3cbc8c'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [1, 90, 100]
      }
    },
    xaxis: {
      type: 'datetime',
      categories: viewType === 'monthly' ? getCurrentMonthDates() :
                  viewType === 'weekly' ? getWeeklyDates() : getYearlyDates()
    },
    yaxis: {
      labels: {
        formatter: (value) => { return value.toLocaleString(); }
      }
    },
    tooltip: {
      x: {
        format: viewType === 'monthly' ? 'dd MMM' :
                viewType === 'weekly' ? 'dd MMM' : 'MMM yyyy'
      }
    }
  };

  const monthlyData = [
    300000, 320000, 330000, 310000, 300000, 320000, 310000,
    330000, 340000, 310000, 320000, 330000, 310000, 340000,
    350000, 340000, 330000, 320000, 310000, 330000, 340000,
    330000, 320000, 310000, 330000, 340000, 320000, 330000,
    340000, 350000, 340000
  ];

  const weeklyData = [
    2200000, 2400000, 2500000, 2600000
  ];

  const yearlyData = [
    3000000, 3200000, 3300000, 3100000, 3000000, 3200000,
    3100000, 3300000, 3400000, 3100000, 3200000, 3300000
  ];

  const series = [
    {
      name: 'Avaliações',
      data: viewType === 'monthly' ? monthlyData :
            viewType === 'weekly' ? weeklyData : yearlyData
    },
    {
      name: 'Serviços',
      data: viewType === 'monthly' ? monthlyData.map(val => val - 100000) :
            viewType === 'weekly' ? weeklyData.map(val => val - 100000) : yearlyData.map(val => val - 100000)
    }
  ];

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  return (
    <div className="chart-container">
      <div className="button-group">
        <select value={viewType} onChange={handleViewTypeChange}>
          <option value="weekly">Semana</option>
          <option value="monthly">Mensal</option>
          <option value="yearly">Anual</option>
        </select>
      </div>
      <Chart options={options} series={series} type="area" height={430} width={750} />
    </div>
  );
};

export default RevenueChart;
