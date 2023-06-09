import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function BarChart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    axios.get("/places").then((res) => {
      setChart(res.data);
    });
  }, []);

  const placesByCity = chart.reduce((acc, place) => {
    const city = place.city;
    if (!acc[city]) {
      acc[city] = 0;
    }
    acc[city] += 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(placesByCity),
    datasets: [
      {
        label: "# of Places",
        data: Object.values(placesByCity),
        borderWidth: 2,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        type: "linear",
        ticks: {
          precision: 0,
        },
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div>
      <Bar data={data} height={400} options={options} />
    </div>
  );
}
