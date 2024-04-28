import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const HealthAnalysis = () => {
    // Sample data - health insurance plans and their percentages
    const [insuranceData, setInsuranceData] = useState([
        ['Plan', 'Percentage'],
        ['Plan 1', 20],
        ['Plan 2', 15],
        ['Plan 3', 25],
        ['Plan 4', 10],
        ['Plan 5', 30]
    ]);

    useEffect(() => {
        // Generate random data
        const randomData = [
            ['Plan', 'Percentage'],
            ['Plan 1', Math.floor(Math.random() * 50) + 1],
            ['Plan 2', Math.floor(Math.random() * 50) + 1],
            ['Plan 3', Math.floor(Math.random() * 50) + 1],
            ['Plan 4', Math.floor(Math.random() * 50) + 1],
            ['Plan 5', Math.floor(Math.random() * 50) + 1]
        ];

        setInsuranceData(randomData);
    }, []);

    return (
        <div>
            <h2>Health Insurance Plan Distribution</h2>
            <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart...</div>}
                    data={insuranceData}
                    options={{
                        title: 'Health Insurance Plan Distribution',
                    }}
                    chartWrapperParams={{ 
                        style: { 
                            backgroundColor: 'none', 
                            boxShadow: 'none', 
                            border: 'none' 
                        } 
                    }}
                />
            </div>
            <table className="insurance-table">
                <thead>
                    <tr>
                        <th>Insurance Plan</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {insuranceData.slice(1).map((row, index) => (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HealthAnalysis;
