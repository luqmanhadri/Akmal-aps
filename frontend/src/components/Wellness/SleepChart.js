import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function SleepChart({chartData}) {
  return <Bar data={chartData} options={{responsive:true,maintainAspectRatio:true}}/>;
}

export default SleepChart;
