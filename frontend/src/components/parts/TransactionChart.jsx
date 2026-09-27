import React from "react";
import TransactionLiChart from "./TransactionLiChart";
import TransactionPieChart from "./TransactionPieChart";

const TransactionChart = ({ transactions = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full my-4 sm:my-6">
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-3 sm:p-5 shadow-lg backdrop-blur-sm">
        <TransactionLiChart transactions={transactions} />
      </div>
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-3 sm:p-5 shadow-lg backdrop-blur-sm">
        <TransactionPieChart transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionChart;
