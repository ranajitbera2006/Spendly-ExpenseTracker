import React, { useState, useEffect } from "react";
import { FiX, FiCalendar, FiTag, FiFileText, FiCheck } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";

const expenseCategories = [
  "food",
  "transportation",
  "entertainment",
  "shopping",
  "bills",
  "healthcare",
  "other",
];

const incomeCategories = [
  "salary",
  "freelance",
  "investments",
  "dividends",
  "rental",
  "gifts",
  "other",
];

const EditTransaction = ({
  transaction,
  onClose,
  onCloseEditTransaction,
  onUpdateTransaction,
  loading,
}) => {
  const handleClose = onClose || onCloseEditTransaction;

  const [type, setType] = useState(
    transaction?.amountType || transaction?.type || "expense",
  );
  const [description, setDescription] = useState(
    transaction?.description || "",
  );

  // Helper to ensure the category starts with a valid lowercase value
  const getInitialCategory = (rawCategory, currentType) => {
    const list =
      currentType === "income" ? incomeCategories : expenseCategories;
    const normalized = rawCategory?.toLowerCase();
    return list.includes(normalized) ? normalized : list[0];
  };

  const [category, setCategory] = useState(() =>
    getInitialCategory(
      transaction?.category,
      transaction?.amountType || transaction?.type || "expense",
    ),
  );

  const [amount, setAmount] = useState(transaction?.amount ?? "");
  const [date, setDate] = useState(() => {
    if (!transaction?.date) return new Date().toLocaleDateString("en-CA");
    const d = new Date(transaction.date);
    return !isNaN(d.getTime())
      ? d.toLocaleDateString("en-CA")
      : new Date().toLocaleDateString("en-CA");
  });

  const activeCategories =
    type === "income" ? incomeCategories : expenseCategories;

  // Sync inputs if transaction prop changes
  useEffect(() => {
    if (transaction) {
      const currentType =
        transaction.amountType || transaction.type || "expense";
      setType(currentType);
      setDescription(transaction.description || "");
      setAmount(transaction.amount ?? "");

      const d = transaction.date ? new Date(transaction.date) : new Date();
      setDate(
        !isNaN(d.getTime())
          ? d.toLocaleDateString("en-CA")
          : new Date().toLocaleDateString("en-CA"),
      );

      setCategory(getInitialCategory(transaction.category, currentType));
    }
  }, [transaction]);

  // Adjust category when user toggles type (Expense <-> Income)
  const handleTypeChange = (newType) => {
    setType(newType);
    const targetCategories =
      newType === "income" ? incomeCategories : expenseCategories;

    // If current category does not belong to new type, switch to default
    if (!targetCategories.includes(category)) {
      setCategory(targetCategories[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecord = {
      ...(transaction?._id && { _id: transaction._id }),
      ...(transaction?.id && { id: transaction.id }),
      amountType: type,
      type,
      description,
      category, // Already lowercase (e.g. "food"), matches DB enum
      amount: Number(amount),
      date,
    };

    if (onUpdateTransaction) {
      await onUpdateTransaction(updatedRecord);
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
          <h3 className="text-xl font-bold text-white">Edit Transaction</h3>
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
            onClick={() => handleTypeChange("expense")}
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
            onClick={() => handleTypeChange("income")}
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

          {/* Category Dropdown */}
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
                className="w-full pl-10 pr-8 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 text-sm capitalize focus:outline-none focus:border-sky-500 cursor-pointer appearance-none"
              >
                {activeCategories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-slate-900 text-slate-200 capitalize"
                  >
                    {/* Capitalize text visually while keeping value lowercase */}
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                type === "expense"
                  ? "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
              }`}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiCheck size={16} /> Update{" "}
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

export default EditTransaction;
