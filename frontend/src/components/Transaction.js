import React from "react";
import { format } from "date-fns";

const Transaction = ({ transaction, onDelete }) => {
  const { _id, amount, type, category, description, date } = transaction;

  return (
    <div
      className={`p-4 rounded-lg shadow-md mb-4 transition-all duration-200 hover:shadow-lg ${
        type === "income" ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-semibold ${
                type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {type === "income" ? "+" : "-"}₹
              {Math.abs(amount).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              {format(new Date(date), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-gray-700">{category}</span>
            {description && (
              <span className="text-gray-500 ml-2">- {description}</span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(_id)}
          className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-full hover:bg-red-100"
          title="Delete transaction"
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
  );
};

export default Transaction;
