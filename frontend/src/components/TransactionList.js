import React from "react";
import axios from "axios";

const TransactionList = ({ transactions, onTransactionDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      onTransactionDeleted(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className={`transaction-item ${
            transaction.type === "expense" ? "expense" : "income"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-text">
                {transaction.description}
              </h3>
              <p className="text-text-secondary">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-lg font-semibold ${
                  transaction.type === "expense" ? "text-error" : "text-success"
                }`}
              >
                {transaction.type === "expense" ? "-" : "+"}₹
                {transaction.amount}
              </span>
              <button
                onClick={() => handleDelete(transaction._id)}
                className="text-text-secondary hover:text-error transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          No transactions yet. Add your first transaction above!
        </div>
      )}
    </div>
  );
};

export default TransactionList;
