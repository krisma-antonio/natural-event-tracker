import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

import { Bar } from "react-chartjs-2";
import ChartData from "./ChartData";
import ChartDataLabels from 'chartjs-plugin-datalabels';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


import { useRef, useEffect, useState } from 'react'
 
const DisplayChart = () => {

    const [numbers, setNumbers] = useState([]);

    const options = {
        scales: {
            x: {
                grid: {
                    borderColor: 'rgb(43, 43, 43)',
                    color: 'rgba(43, 43, 43, 0.56)',
                    borderWidth: 3
                },
                ticks: {
                    color: 'rgb(43, 43, 43)',
                    fontSize: 14,
                    beginAtZero: true
                }
            },
            y: {
                grid: {
                    borderColor: 'rgba(43, 43, 43, 0.78)',
                    color: 'rgba(43, 43, 43, 0.56)',
                    borderWidth: 3
                },
                ticks: {
                    color: 'rgb(43, 43, 43)',
                    fontSize: 14,
                    beginAtZero: true
                }
            }
        }, 
        plugins: {
            title: {
                display: true,
                text: 'Number of Active and Past Events',
                color: 'rgba(27, 27, 27, 0.85)',
                font: {size: 20}

            }, 
            legend: {
                position: 'top',
                onClick: (evt, legendItem, legend) => {
                    const index = legend.chart.data.labels.indexOf(legendItem.text);
                    legend.chart.toggleDataVisibility(index);
                    legend.chart.update();
                }, 
                labels: {
                    font: {
                        size: 14,
                        color: 'rgb(33, 33, 33)'
                    },
                    generateLabels: (chart) => {
                        let visibility = [];
                        for(let i = 0; i < chart.data.labels.length; i++) {
                            if(chart.getDataVisibility(i) == true) {
                                visibility.push(false);
                            } else {
                                visibility.push(true);
                            }
                        }
                        return chart.data.labels.map(
                            (label, index)=>({
                                text: label,
                                strokeStyle: chart.data.datasets[0].borderColor[index],
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                hidden: visibility[index],
                                fontColor: "rgb(43, 43, 43)"
                            })
                        )
                    },
                }
            }
        }
    };

    const data = {
        labels: ["Earthquakes","Severe Storms","Volcanoes","Sea and Lake Ice", "Wildfires","Droughts","Floods","Dust and Haze","Landslides","Snow","Temperature Extremes"],
        datasets: [
            {
            label: "Number of Events",
            data: numbers.map((num) => num.num),
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 255, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)'],
            borderWidth: 2,
            },
        ],
        };

 
    return (
        <>
        <div className="chart-top">
            <h1>Generate Graph Chart</h1>
        </div>
        <div className="chart-box">
            <ChartData setNumbers={setNumbers}/>
            <Bar data={data} plugins={[ChartDataLabels]} options={options}/>
        </div>

        <div className="chart-desc">
            <h3>Graph Data Information</h3>
                <h5>USGS API</h5>
                    <p>Earthquakes: Data records from past 30 days to present</p>
                <h5>NASA EONET API</h5>
                    <p>Rest of events: Data records from 2015 to present</p>
        </div>
        </>
    );
}

export default DisplayChart;