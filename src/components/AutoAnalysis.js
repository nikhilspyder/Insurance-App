import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const AutoInsuranceAnalysis = () => {
    // Sample data - auto insurance analysis
    const [autoInsuranceData, setAutoInsuranceData] = useState([
        ['Year', 'Premiums', 'Claims'],
        ['2019', 50000, 30000],
        ['2020', 60000, 35000],
        ['2021', 65000, 40000],
        ['2022', 70000, 42000],
    ]);

    // Sample data - review counts and ratings
    const [reviewData, setReviewData] = useState([
        ['Rating', 'Count'],
        ['5 Stars', 25],
        ['4 Stars', 20],
        ['3 Stars', 15],
        ['2 Stars', 10],
        ['1 Star', 5],
    ]);

    useEffect(() => {
        // Generate random data for auto insurance analysis
        const randomAutoInsuranceData = [
            ['Year', 'Premiums', 'Claims'],
            ['2019', Math.floor(Math.random() * 100000) + 1, Math.floor(Math.random() * 50000) + 1],
            ['2020', Math.floor(Math.random() * 100000) + 1, Math.floor(Math.random() * 50000) + 1],
            ['2021', Math.floor(Math.random() * 100000) + 1, Math.floor(Math.random() * 50000) + 1],
            ['2022', Math.floor(Math.random() * 100000) + 1, Math.floor(Math.random() * 50000) + 1],
        ];

        setAutoInsuranceData(randomAutoInsuranceData);

        // Generate random data for review counts and ratings
        const randomReviewData = [
            ['Rating', 'Count'],
            ['5 customer', Math.floor(Math.random() * 50) + 1],
            ['4 customer', Math.floor(Math.random() * 50) + 1],
            ['3 customer', Math.floor(Math.random() * 50) + 1],
            ['2 customer', Math.floor(Math.random() * 50) + 1],
            ['1 customer', Math.floor(Math.random() * 50) + 1],
        ];

        setReviewData(randomReviewData);
    }, []);

    return (
        <div>
            <h2>Auto Insurance Analysis</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '45%' }}>
                    <h3>Annual Premiums vs Claims</h3>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart...</div>}
                        data={autoInsuranceData}
                        options={{
                            title: 'Annual Premiums vs Claims',
                            vAxis: { title: 'Amount' },
                            hAxis: { title: 'Year' },
                            seriesType: 'bars',
                            series: { 1: { type: 'line' } },
                        }}
                    />
                </div>
                <div style={{ width: '45%' }}>
                    <h3>Stacked Chart</h3>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart...</div>}
                        data={autoInsuranceData}
                        options={{
                            title: 'Stacked Chart',
                            isStacked: true,
                            vAxis: { title: 'Year' },
                            hAxis: { title: 'Amount' },
                        }}
                    />
                </div>
            </div>
            <div style={{ marginTop: '50px' }}>
                <h3>Most Purchased</h3>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart...</div>}
                    data={reviewData}
                    options={{
                        title: 'Purchased',
                    }}
                />
            </div>
        </div>
    );
};

export default AutoInsuranceAnalysis;
