import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
const [pieData, updatePieData] = useState([]);
const [month, updateMonth] = useState('april');

useEffect(() => {
    const getStatistics = async () => {
      fetch(`http://localhost:8000/api/products/piechart?&month=${month}`).then((response) => { return response.json()}).then((data) => {
        updatePieData([data.catCounts.mensClothing, data.catCounts.womensClothing, data.catCounts.electronics, data.catCounts.jewelery]);
      })
    }
    getStatistics();
  }, [month]);

  const data = {
    labels: ["Men's clothing", "Women's clothoing", "Electronics", "Jewelery"],
    datasets: [
      {
        data: pieData,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#63FF84'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#63FF84'],
      },
    ],
  };

  return (
    <Container style={{marginTop:'200px'}}>
      <h2 className="text-center mb-4">Pie Chart - { month }</h2>
      <select style={{float:'right'}} value={month} className='select' onChange={(e) => updateMonth(e.target.value)}>
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
      <Pie style={{width: '400px !important', height: '400px !important'}} data={data} />
    </Container>
  );
};

export default PieChart;
