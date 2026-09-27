import React, { useState, useMemo } from "react";
import {
  FiTrash2,
  FiEdit2,
  FiShoppingBag,
  FiCoffee,
  FiTruck,
  FiFilm,
  FiFileText,
  FiActivity,
  FiMoreHorizontal,
  FiBriefcase,
  FiTrendingUp,
  FiPieChart,
  FiHome,
  FiGift,
} from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import TransactionSearchBar from "./TransactionSearchBar";

const categoryConfig = {
  food: {
    icon: <FiCoffee />,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  transportation: {
    icon: <FiTruck />,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  entertainment: {
    icon: <FiFilm />,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  shopping: {
    icon: <FiShoppingBag />,
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  bills: {
    icon: <FiFileText />,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  healthcare: {
    icon: <FiActivity />,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },

  salary: {
    icon: <FiBriefcase />,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  freelance: {
    icon: <MdCurrencyRupee />,
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  investments: {
    icon: <FiTrendingUp />,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  dividends: {
    icon: <FiPieChart />,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  rental: {
    icon: <FiHome />,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  gifts: {
    icon: <FiGift />,
    color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  },

  other: {
    icon: <FiMoreHorizontal />,
    color: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  },
};

const TransactionList = ({
  transactions = [],
  onDeleteTransaction,
  onEditTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch = item.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, selectedCategory]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Transactions History
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Review, edit, and organize all income and expenses.
          </p>
        </div>
        <span className="text-xs font-medium text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/60 self-start sm:self-auto">
          {filteredTransactions.length}{" "}
          {filteredTransactions.length === 1 ? "entry" : "entries"} found
        </span>
      </div>

      {/* Integrated Search and Category Filter */}
      <TransactionSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Transaction List Container */}
      <div className="mt-4">
        {filteredTransactions.length > 0 ? (
          <>
            {/* Desktop Table View (>= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Transaction</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredTransactions.map((item) => {
                    const isIncome =
                      item.type === "income" || item.amountType === "income";
                    const cat =
                      categoryConfig[item.category] || categoryConfig.Other;
                    const dateFormatted = item.date
                      ? new Date(item.date)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                      : "—";

                    return (
                      <tr
                        key={item._id || item.id}
                        className="hover:bg-slate-800/30 transition group"
                      >
                        <td className="py-3.5 px-4 font-semibold text-white">
                          {item.description}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${cat.color}`}
                          >
                            {cat.icon}
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-xs">
                          {dateFormatted}
                        </td>
                        <td
                          className={`py-3.5 px-4 text-right font-bold ${
                            isIncome ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          ₹{Number(item.amount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-1">
                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() =>
                                onEditTransaction && onEditTransaction(item)
                              }
                              className="p-1.5 text-slate-400 hover:text-sky-400 cursor-pointer hover:bg-sky-500/10 rounded-lg transition"
                              title="Edit Transaction"
                            >
                              <FiEdit2 size={15} />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() =>
                                onDeleteTransaction &&
                                onDeleteTransaction(item._id || item.id)
                              }
                              className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer hover:bg-rose-500/10 rounded-lg transition"
                              title="Delete Transaction"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (< 768px) */}
            <div className="md:hidden space-y-2.5">
              {filteredTransactions.map((item) => {
                const isIncome =
                  item.type === "income" || item.amountType === "income";
                const cat =
                  categoryConfig[item.category] || categoryConfig.Other;
                const dateFormatted = item.date
                  ? new Date(item.date).toISOString().split("T")[0]
                  : "—";

                return (
                  <div
                    key={item._id || item.id}
                    className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">
                          {item.description}
                        </h4>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {item.category} • {dateFormatted}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold ${
                          isIncome ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {isIncome ? "+" : "-"}₹
                        {Number(item.amount).toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() =>
                            onEditTransaction && onEditTransaction(item)
                          }
                          className="p-1.5 text-slate-400 hover:text-sky-400 transition"
                          title="Edit"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onDeleteTransaction &&
                            onDeleteTransaction(item._id || item.id)
                          }
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-12 px-4 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400 font-medium">
              No transactions found
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or selecting "All Categories".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
