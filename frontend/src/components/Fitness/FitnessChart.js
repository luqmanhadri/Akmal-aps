import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function FitnessChart({ chartData }) {
  return <Line height="80px" data={chartData} />;
}

export default FitnessChart;
