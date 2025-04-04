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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

import BarLoader from './Loader';

import { useRef, useEffect, useState } from 'react'
 
const DisplayChart = () => {

    const [numbers, setNumbers] = useState([]);
    
    const options = {
        scales: {
            x: {
                grid: {
                    borderColor: 'rgba(226, 226, 226, 0.2)',
                    color: 'rgba(226, 226, 226, 0.56)',
                    borderWidth: 3
                },
                ticks: {
                    color: 'rgba(226, 226, 226, 0.56)',
                    fontSize: 14,
                    beginAtZero: true
                }
            },
            y: {
                grid: {
                    borderColor: 'rgba(226, 226, 226, 0.2)',
                    color: 'rgba(226, 226, 226, 0.56)',
                    borderWidth: 3
                },
                ticks: {
                    color: 'rgba(226, 226, 226, 0.56)',
                    fontSize: 14,
                    beginAtZero: true
                }
            }
        }, 
        plugins: {
            title: {
                display: true,
                text: 'Number of Active/Past events',
                color: 'white',
                font: {size: 20}

            }, 
            legend: {
                labels: {
                    font: {
                        size: 14,
                        color: 'white'
                    }
                }
            }
        }
    };

    const data = {
        labels: ["Earthquake","Severe Storms","Volcanoes","Sea and Lake Ice", "Wildfires","Droughts","Floods","Dust and Haze","Landslides","Snow","Temperature Extremes"],
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
        <div className="chart-box">
        <ChartData setNumbers={setNumbers}/>
        <Bar data={data} options={options}/>
        </div>
    );
}

export default DisplayChart;