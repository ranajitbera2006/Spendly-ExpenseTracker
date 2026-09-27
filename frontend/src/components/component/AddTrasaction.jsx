import React, { useState, useEffect } from "react";
import { FiX, FiCalendar, FiTag, FiFileText, FiPlus } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";

const transactionCategories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Healthcare",
  "Other",
];

const incomeCategories = [
  "Salary",
  "Freelance",
  "Investments",
  "Dividends",
  "Rental",
  "Gifts",
  "Other",
];

const AddTransaction = ({
  onClose,
  onCloseAddTransaction,
  onAddTransaction,
  loading,
}) => {
  const handleClose = onClose || onCloseAddTransaction;

  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(transactionCategories[0]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const activeCategories =
    type === "expense" ? transactionCategories : incomeCategories;

  useEffect(() => {
    setCategory(
      type === "expense" ? transactionCategories[0] : incomeCategories[0],
    );
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = {
      amountType: type,
      description,
      category,
      amount: Number(amount),
      date,
    };

    if (onAddTransaction) {
      await onAddTransaction(newRecord);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">Add Transaction</h3>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Type Toggle Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 my-4">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              type === "expense"
                ? "bg-rose-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType("income")}
            className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              type === "income"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Income
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Amount (₹)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 text-lg">
                <MdCurrencyRupee />
              </span>
              <input
                type="number"
                step="any"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white font-semibold text-lg focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Category
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <FiTag />
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full pl-10 pr-8 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500 cursor-pointer appearance-none"
              >
                {activeCategories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-slate-900 text-slate-200"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Date
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <FiCalendar />
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500 scheme-dark"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Description
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400">
                <FiFileText />
              </span>
              <textarea
                rows={2}
                placeholder="What was this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-800/40 text-slate-300 text-sm hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold shadow-lg transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                type === "expense"
                  ? "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
              }`}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiPlus size={16} /> Save{" "}
                  {type === "expense" ? "Expense" : "Income"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
