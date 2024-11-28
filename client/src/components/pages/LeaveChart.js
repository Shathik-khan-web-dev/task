import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const LeaveChart = ({ chartData }) => {
  if (!chartData) {
    return <p>No chart data available.</p>; 
  }

  const options = { 
    responsive: true, 
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 10,
            weight: "bold",
          },
          color: "rgba(0, 0, 0, 0.7)",
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.raw + " Leaves";
          },
        },
      },
    },
    maintainAspectRatio: false,
    cutout: 0,
  };

  return (
    <div style={{ height: "300px" }}>
      <h5 className="text-center" style={{ color: "#6b6b6b" }}>
        Leaves
      </h5>

      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default LeaveChart;
