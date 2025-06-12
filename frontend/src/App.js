import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseCharts from "./components/ExpenseCharts";
import "./index.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions"
      );
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch transactions");
      setLoading(false);
    }
  };

  const handleTransactionAdded = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleTransactionDeleted = (deletedId) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction._id !== deletedId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-2xl text-text-secondary loading">Loading...</div>
      </div>
    );
  }

  // Calculate summary values
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
        <h1 className="text-5xl font-bold text-center mb-4 text-gradient">
          Expense Tracker
        </h1>

        {error && (
          <div className="glass bg-error/10 border border-error text-error px-4 py-3 rounded-lg mb-6 animate-fade-in">
            {error}
          </div>
        )}

        {/* Top summary row */}
        <div className="w-full flex flex-col md:flex-row gap-6 mb-2">
          <div className="summary-card income flex-1">
            <h3 className="text-text-secondary mb-2">Income</h3>
            <p className="text-3xl font-bold text-success">
              ₹{totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="summary-card expense flex-1">
            <h3 className="text-text-secondary mb-2">Expenses</h3>
            <p className="text-3xl font-bold text-error">
              ₹{totalExpenses.toFixed(2)}
            </p>
          </div>
          <div className="summary-card balance flex-1">
            <h3 className="text-text-secondary mb-2">Balance</h3>
            <p
              className="text-3xl font-bold"
              style={{ color: balance >= 0 ? "#4ecdc4" : "#b794f4" }}
            >
              ₹{balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Main content: Add Transaction (left), Pie Chart (right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6 text-text">
              Add Transaction
            </h2>
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6 text-text">
              Expense Analysis
            </h2>
            <ExpenseCharts transactions={transactions} />
          </div>
        </div>

        {/* Transaction history at the bottom */}
        <div className="card w-full mt-4">
          <h2 className="text-2xl font-semibold mb-6 text-text">
            Transaction History
          </h2>
          <TransactionList
            transactions={transactions}
            onTransactionDeleted={handleTransactionDeleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
