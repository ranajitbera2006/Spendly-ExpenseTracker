import React, { useMemo, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const defaultColors = [
  "#38bdf8", 
  "#10b981", 
  "#a855f7", 
  "#f43f5e", 
  "#f59e0b",
  "#06b6d4", 
  "#ec4899", 
  "#8b5cf6", 
];

const monthsList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

// Safe date extractor for MongoDB & standard formats
const parseDate = (d) => {
  if (!d) return new Date();
  if (typeof d === "object" && d.$date) return new Date(d.$date);
  return new Date(d);
};

const TransactionPieChart = ({ transactions = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState("Sep");
  const [viewType, setViewType] = useState("expense");

  const chartData = useMemo(() => {
    const targetMonthIdx = monthMap[selectedMonth];

    const filtered = transactions.filter((t) => {
      const txDate = parseDate(t.date || t.createdAt);
      const isMonth = txDate.getMonth() === targetMonthIdx;
      const isType = (t.amountType || t.type || "").toLowerCase() === viewType;
      return isMonth && isType;
    });

    const categoryTotals = {};
    filtered.forEach((t) => {
      const cat = (t.category || "other").toLowerCase();
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount || 0);
    });

    return Object.entries(categoryTotals).map(([name, value], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      fill: defaultColors[index % defaultColors.length],
    }));
  }, [transactions, selectedMonth, viewType]);

  const totalAmount = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  const handleSelect = (selected) => {
    setSelectedMonth(selected);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="w-full">
      {/* Header, Switcher, and Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setViewType("expense")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              viewType === "expense"
                ? "bg-rose-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Expenses
          </button>
          <button
            type="button"
            onClick={() => setViewType("income")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              viewType === "income"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Income
          </button>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm capitalize bg-slate-950 border border-slate-800 text-slate-200 hover:bg-slate-800"
          >
            {selectedMonth} ⬇️
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-slate-900 rounded-2xl z-30 w-36 max-h-56 overflow-y-auto p-2 shadow-2xl border border-slate-800 text-slate-200"
          >
            {monthsList.map((month) => (
              <li key={month}>
                <button
                  type="button"
                  className={
                    selectedMonth === month
                      ? "active bg-sky-500 text-slate-950"
                      : ""
                  }
                  onClick={() => handleSelect(month)}
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Donut Chart Canvas */}
      <div className="relative w-full h-56 sm:h-64 lg:h-72">
        {chartData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  cursor={false}
                  formatter={(val) => [
                    `₹${Number(val).toLocaleString()}`,
                    "Amount",
                  ]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "0.75rem",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Total {viewType === "income" ? "Earned" : "Spent"}
              </span>
              <span
                className={`text-lg sm:text-xl font-extrabold ${
                  viewType === "income" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400 font-medium">
              No {viewType} records found
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              No entries recorded for {selectedMonth}.
            </p>
          </div>
        )}
      </div>

      {/* Breakdown Legend */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-2 sm:px-4 mt-3">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/40"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-200">
                ₹{item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionPieChart;
