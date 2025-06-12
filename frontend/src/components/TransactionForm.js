import React, { useState } from "react";
import axios from "axios";

const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Healthcare",
  "Education",
  "Other",
];

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
      category: "",
    }));
  };

  const validateForm = () => {
    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      parseFloat(formData.amount) <= 0
    ) {
      setError("Please enter a valid amount");
      return false;
    }

    if (formData.type === "expense" && !formData.category) {
      setError("Please select a category for expenses");
      return false;
    }

    if (!formData.description.trim()) {
      setError("Please enter a description");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        formData
      );
      onTransactionAdded(response.data);
      setFormData({
        description: "",
        amount: "",
        type: "expense",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add transaction. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg animate-fade-in"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="tab-container">
        <button
          type="button"
          className={`tab ${formData.type === "expense" ? "active" : ""}`}
          onClick={() => handleTypeChange("expense")}
        >
          Expense
        </button>
        <button
          type="button"
          className={`tab ${formData.type === "income" ? "active" : ""}`}
          onClick={() => handleTypeChange("income")}
        >
          Income
        </button>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-text-secondary mb-2 font-medium"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="input focus:ring-2 focus:ring-primary/20"
          placeholder="Enter description"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="amount"
          className="block text-text-secondary mb-2 font-medium"
        >
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            ₹
          </span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="input pl-8 focus:ring-2 focus:ring-primary/20"
            placeholder="0.00"
          />
        </div>
      </div>

      {formData.type === "expense" && (
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-text-secondary mb-2 font-medium"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="date"
          className="block text-text-secondary mb-2 font-medium"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        type="submit"
        className={`btn w-full ${
          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Adding...
          </span>
        ) : (
          "Add Transaction"
        )}
      </button>
    </form>
  );
};

export default TransactionForm;
