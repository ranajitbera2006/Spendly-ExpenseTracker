import React, { useMemo, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const parseDate = (d) => {
  if (!d) return new Date();
  if (typeof d === "object" && d.$date) return new Date(d.$date);
  return new Date(d);
};

const TransactionLiChart = ({ transactions = [] }) => {
  const [timeframe, setTimeframe] = useState("Monthly");

  const activeData = useMemo(() => {
    if (!transactions.length) return [];

    if (timeframe === "Monthly") {
      const currentYear = new Date().getFullYear();
      const monthlyMap = monthsList.map((month) => ({
        name: month,
        income: 0,
        transaction: 0, // expenses
      }));

      transactions.forEach((tx) => {
        const txDate = parseDate(tx.date || tx.createdAt);
        if (txDate.getFullYear() === currentYear) {
          const mIdx = txDate.getMonth();
          const amt = Number(tx.amount || 0);
          const type = (tx.amountType || tx.type || "").toLowerCase();

          if (type === "income") {
            monthlyMap[mIdx].income += amt;
          } else {
            monthlyMap[mIdx].transaction += amt;
          }
        }
      });

      return monthlyMap;
    } else {
      // Yearly breakdown
      const yearlyMap = {};

      transactions.forEach((tx) => {
        const txDate = parseDate(tx.date || tx.createdAt);
        const yr = String(txDate.getFullYear());
        const amt = Number(tx.amount || 0);
        const type = (tx.amountType || tx.type || "").toLowerCase();

        if (!yearlyMap[yr]) {
          yearlyMap[yr] = { name: yr, income: 0, transaction: 0 };
        }

        if (type === "income") {
          yearlyMap[yr].income += amt;
        } else {
          yearlyMap[yr].transaction += amt;
        }
      });

      return Object.values(yearlyMap).sort(
        (a, b) => Number(a.name) - Number(b.name),
      );
    }
  }, [transactions, timeframe]);

  const handleSelect = (selected) => {
    setTimeframe(selected);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const formatYAxis = (val) => {
    if (val >= 1000) return `${val / 1000}k`;
    return val;
  };

  return (
    <div className="w-full">
      {/* Header & Dropdown */}
      <div className="flex items-center justify-between px-2 sm:px-4 mb-3">
        <h2 className="text-sm sm:text-base font-bold text-slate-100">
          Spending Trend
        </h2>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm capitalize bg-slate-950 border border-slate-800 text-slate-200 hover:bg-slate-800"
          >
            {timeframe} ⬇️
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-slate-900 rounded-2xl z-30 w-36 p-2 shadow-2xl border border-slate-800 text-slate-200"
          >
            {["Monthly", "Yearly"].map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className={
                    timeframe === item ? "active bg-sky-500 text-slate-950" : ""
                  }
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activeData}
            margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              width={55}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              cursor={false}
              formatter={(val, name) => [
                `₹${Number(val).toLocaleString()}`,
                name === "income" ? "Income" : "Expense",
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "0.75rem",
                color: "#f8fafc",
                fontSize: "12px",
              }}
            />
            <Line
              dataKey="income"
              type="monotone"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="transaction"
              type="monotone"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              iconType="circle"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionLiChart;
