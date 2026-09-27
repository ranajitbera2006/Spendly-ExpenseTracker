import React from "react";
import { FiSearch, FiX, FiCheck, FiChevronDown } from "react-icons/fi";
import {
  MdOutlineFastfood,
  MdDirectionsCar,
  MdMovie,
  MdShoppingBag,
  MdReceiptLong,
  MdLocalHospital,
  MdAttachMoney,
  MdWork,
  MdTrendingUp,
  MdCardGiftcard,
  MdCategory,
  MdCurrencyRupee,
} from "react-icons/md";
const categoryIcons = {
  All: <MdCategory size={15} />,
  Food: <MdOutlineFastfood size={15} className="text-amber-400" />,
  Transportation: <MdDirectionsCar size={15} className="text-sky-400" />,
  Entertainment: <MdMovie size={15} className="text-purple-400" />,
  Shopping: <MdShoppingBag size={15} className="text-pink-400" />,
  Bills: <MdReceiptLong size={15} className="text-rose-400" />,
  Healthcare: <MdLocalHospital size={15} className="text-emerald-400" />,
  Salary: <MdCurrencyRupee size={15} className="text-emerald-400" />,
  Freelance: <MdWork size={15} className="text-cyan-400" />,
  Investments: <MdTrendingUp size={15} className="text-teal-400" />,
  Dividends: <MdTrendingUp size={15} className="text-indigo-400" />,
  Rental: <MdReceiptLong size={15} className="text-yellow-400" />,
  Gifts: <MdCardGiftcard size={15} className="text-fuchsia-400" />,
  Other: <MdCategory size={15} className="text-slate-400" />,
};

const defaultCategories = [
  "All",
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Healthcare",
  "Salary",
  "Freelance",
  "Investments",
  "Dividends",
  "Rental",
  "Gifts",
  "Other",
];

const TransactionSearchBar = ({
  searchTerm = "",
  setSearchTerm,
  selectedCategory = "All",
  setSelectedCategory,
  categories = defaultCategories,
}) => {
  const handleSelect = (category) => {
    setSelectedCategory(category);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="relative w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-4">
      {/* Search Input */}
      <div className="relative flex-1 group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-400 transition-colors pointer-events-none">
          <FiSearch size={18} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by description, merchant, or notes..."
          className="w-full pl-10 pr-9 py-2.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/80 focus:ring-2 focus:ring-sky-500/20 backdrop-blur-md transition-all shadow-inner"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-1 rounded-lg transition"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Dropdown Container */}
      <div className="dropdown sm:dropdown-end static sm:relative sm:w-56 shrink-0">
        {/* Dropdown Trigger */}
        <div
          tabIndex={0}
          role="button"
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 rounded-2xl text-slate-200 text-sm cursor-pointer transition shadow-sm"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="p-1 rounded-md bg-slate-950/80 border border-slate-800 shrink-0">
              {categoryIcons[selectedCategory] || <MdCategory size={15} />}
            </span>
            <span className="font-medium text-xs sm:text-sm truncate">
              {selectedCategory === "All" ? "All Categories" : selectedCategory}
            </span>
          </div>
          <FiChevronDown size={16} className="text-slate-400 ml-1.5 shrink-0" />
        </div>

        {/* Dropdown Content - Anchored directly below, centered horizontally on mobile */}
        <div
          tabIndex={0}
          className="dropdown-content z-50 absolute left-2 right-2 top-full mt-2 sm:left-auto sm:right-0 sm:top-full sm:w-120 p-3 shadow-2xl bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-2xl"
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1 mb-2 text-center sm:text-left">
            Select Category
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-64 sm:max-h-none overflow-y-auto sm:overflow-visible">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelect(cat)}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition cursor-pointer border text-left ${
                    isSelected
                      ? "bg-sky-500/15 text-sky-400 font-semibold border-sky-500/40"
                      : "bg-slate-950/40 hover:bg-slate-800/70 border-slate-800/60 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="shrink-0">{categoryIcons[cat]}</span>
                    <span className="truncate">{cat}</span>
                  </div>
                  {isSelected && (
                    <FiCheck size={13} className="text-sky-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSearchBar;
