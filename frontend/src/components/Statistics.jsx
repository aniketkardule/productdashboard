import React from "react";
import { useState, useEffect } from "react";

const Statistics = () => {

    const [statisticData, updateStatisticData] = useState(null);
    const [statisticMonth, updateStatisticMonth] = useState('january');
    const [isStatistics, updateIsStatistics] = useState(false);

    useEffect(() => {
        const getStatistics = async () => {
          fetch(`http://localhost:8000/api/products/statistics?&month=${statisticMonth}`).then((response) => { return response.json()}).then((data) => {
            updateStatisticData(data);
            updateIsStatistics(true);
          })
        }
        getStatistics();
      }, [statisticMonth]);

    return (
        <div className='statistic'>
            <div className='flex'>
                <h2 className='title'>Statistic - { statisticMonth }</h2>
                <select value={statisticMonth} className='select' onChange={(e) => updateStatisticMonth(e.target.value)}>
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
            
            <div className='inner-statistic'>
                {
                    isStatistics &&
                
                
                <>
                    <p className='stat-container'><span className='stat-summery'>total Sale</span><span className='stat-value'>{ (Math.round(statisticData.saleAmount * 100) /100).toFixed(2) }</span></p>
                    <p className='stat-container'><span className='stat-summery'>Total sold items</span><span className='stat-value'>{ statisticData.numberOfSoldItems }</span></p>
                    <p className='stat-container'><span className='stat-summery'>Total not sold items</span><span className='stat-value'>{ statisticData.notSoldItems }</span></p>
                </>
                }
            </div>
        </div>
    );
}


export default Statistics;