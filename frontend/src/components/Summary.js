import React from "react";

const Summary = ({ transactions }) => {
  const calculateSummary = () => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += Number(transaction.amount);
        } else {
          acc.expenses += Number(transaction.amount);
        }
        return acc;
      },
      { income: 0, expenses: 0 }
    );
  };

  const { income, expenses } = calculateSummary();
  const balance = income - expenses;

  return (
    <div className="summary-container">
      <div className="summary-card income">
        <h3>Total Income</h3>
        <p className="amount">₹{income.toFixed(2)}</p>
      </div>
      <div className="summary-card expenses">
        <h3>Total Expenses</h3>
        <p className="amount">₹{expenses.toFixed(2)}</p>
      </div>
      <div className="summary-card balance">
        <h3>Balance</h3>
        <p className={`amount ${balance >= 0 ? "positive" : "negative"}`}>
          ₹{Math.abs(balance).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Summary;
