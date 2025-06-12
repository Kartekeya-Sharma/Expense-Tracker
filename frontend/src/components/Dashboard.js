import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  PlusIcon,
  MinusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// Constants
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
];
const CATEGORIES = ["Food", "Transport", "Entertainment", "Bills", "Other"];

// Helper function for class names
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Dashboard = () => {
  // State
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
  });

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newTransaction.amount &&
      (newTransaction.type === "income" || newTransaction.category)
    ) {
      setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
      setNewTransaction({
        type: "expense",
        amount: "",
        category: "",
        description: "",
      });
    }
  };

  const handleTypeChange = (type) => {
    setNewTransaction({
      ...newTransaction,
      type,
      category: type === "income" ? "" : newTransaction.category,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Data processing
  const getChartData = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ];
  };

  // Add a function to get category breakdown data
  const getCategoryBreakdown = () => {
    const categoryTotals = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {});

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Components
  const TransactionTypeCard = ({ type, icon: Icon, title, description }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer ${
        newTransaction.type === type
          ? type === "income"
            ? "bg-green-900/30 border-2 border-green-700"
            : "bg-red-900/30 border-2 border-red-700"
          : "bg-gray-800 border border-gray-700"
      }`}
      onClick={() => handleTypeChange(type)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <Icon
          className={`h-8 w-8 ${
            type === "income" ? "text-green-400" : "text-red-400"
          }`}
        />
      </div>
    </motion.div>
  );

  const TransactionForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>

      {newTransaction.type === "expense" && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={newTransaction.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a description (optional)"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
      >
        Add{" "}
        {newTransaction.type.charAt(0).toUpperCase() +
          newTransaction.type.slice(1)}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700"
        >
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-700 p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-blue-500 shadow text-white"
                      : "text-gray-300 hover:bg-gray-600 hover:text-white"
                  )
                }
              >
                Overview
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-blue-500 shadow text-white"
                      : "text-gray-300 hover:bg-gray-600 hover:text-white"
                  )
                }
              >
                Add Transaction
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-4">
              <Tab.Panel>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 mr-2" />
                      Income vs Expense
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getChartData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {getChartData().map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              color: "#F3F4F6",
                            }}
                          />
                          <Legend wrapperStyle={{ color: "#F3F4F6" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                      <ArrowTrendingDownIcon className="h-5 w-5 text-red-400 mr-2" />
                      Recent Transactions
                    </h3>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {transactions.slice(-5).map((transaction) => (
                          <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`p-4 rounded-lg ${
                              transaction.type === "income"
                                ? "bg-green-900/30 border border-green-800"
                                : "bg-red-900/30 border border-red-800"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-white">
                                  {transaction.description}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {transaction.category}
                                </p>
                              </div>
                              <div className="flex items-center">
                                {transaction.type === "income" ? (
                                  <PlusIcon className="h-5 w-5 text-green-400 mr-2" />
                                ) : (
                                  <MinusIcon className="h-5 w-5 text-red-400 mr-2" />
                                )}
                                <span
                                  className={`font-semibold ${
                                    transaction.type === "income"
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  ₹{transaction.amount}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </Tab.Panel>

              <Tab.Panel>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TransactionTypeCard
                      type="income"
                      icon={PlusIcon}
                      title="Income"
                      description="Add money received"
                    />
                    <TransactionTypeCard
                      type="expense"
                      icon={MinusIcon}
                      title="Expense"
                      description="Add money spent"
                    />
                  </div>
                  <TransactionForm />
                </motion.div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
