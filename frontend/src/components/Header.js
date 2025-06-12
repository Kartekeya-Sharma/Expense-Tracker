import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">Expense Tracker</h1>
            <p className="text-indigo-100 mt-1">
              Track your income and expenses with ease
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm text-indigo-100">
                Your Financial Companion
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
