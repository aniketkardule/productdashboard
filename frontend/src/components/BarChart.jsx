import React from 'react';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const BarChart = () => {

    const [barMonth, updateBarMonth] = useState('january');
    const [barData, updateBarData] = useState([]);
    useEffect(() => {
        const getStatistics = async () => {
          fetch(`http://localhost:8000/api/products/barchart?&month=${barMonth}`).then((response) => { return response.json()}).then((data) => {
            updateBarData([data.first,data.second,data.third, data.fourth, data.fifth, data.sixth, data.seventh, data.eight, data.ninth, data.tenth])
          })
        }
        getStatistics();
      }, [barMonth]);

  const data = {
    labels: ['0 - 100', '101 - 200', '201 - 300', '301 - 400', '401 - 500', '501 - 600', '601 - 700', '701 - 800', '801 - 900', '901 - Above'],
    datasets: [
      {
        label: 'Bar Chart',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: barData,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container style={{marginTop:'150px'}}>
        <div>
        <h2 className="text-center mb-4">Bar Chart Stats - { barMonth }</h2> 
      
        <select style={{float: 'right'}} className='select' value={ barMonth } onChange={(e) => updateBarMonth(e.target.value)}>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="octomber">Octomber</option>
            <option value="november">November</option>
            <option value="december">December</option>
        </select>
    </div>
      
      <Bar data={data} options={options} />
    </Container>
  );
};

export default BarChart;
