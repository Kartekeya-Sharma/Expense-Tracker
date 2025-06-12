import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCharts = ({ transactions }) => {
  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate category-wise expenses
  const categoryExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#2c3e50",
        bodyColor: "#2c3e50",
        borderColor: "#e9ecef",
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        usePointStyle: true,
      },
    },
  };

  // Prepare data for income vs expense pie chart
  const incomeExpenseData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4CAF50", "#FF5252"],
        borderColor: ["#388E3C", "#D32F2F"],
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for category breakdown pie chart
  const categoryData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        data: Object.values(categoryExpenses),
        backgroundColor: [
          "#FF6384", // Food
          "#36A2EB", // Drinks
          "#FFCE56", // Travel
          "#4BC0C0", // Shopping
          "#9966FF", // Entertainment
          "#FF9F40", // Bills
          "#4CAF50", // Healthcare
          "#9C27B0", // Education
          "#FF5722", // Housing
          "#2196F3", // Transportation
          "#795548", // Personal Care
          "#607D8B", // Gifts
          "#9E9E9E", // Other
        ],
        borderWidth: 2,
      },
    ],
  };

  // Find top spending category
  const topCategory = Object.entries(categoryExpenses).sort(
    ([, a], [, b]) => b - a
  )[0];

  return (
    <div className="charts-container">
      <div className="chart-section">
        <h2>Income vs Expenses</h2>
        <div className="chart">
          <Pie data={incomeExpenseData} options={chartOptions} />
        </div>
      </div>

      <div className="chart-section">
        <h2>Expense Categories</h2>
        <div className="chart">
          <Pie data={categoryData} options={chartOptions} />
        </div>
      </div>

      <div className="top-category">
        <h2>Top Spending Category</h2>
        {topCategory && (
          <div className="category-info">
            <h3>{topCategory[0]}</h3>
            <p>${topCategory[1].toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;
