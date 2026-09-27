import React, { useMemo } from "react";
import Card from "../component/Card";
import { LuWallet } from "react-icons/lu";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";

const Cards = ({ transactions = [] }) => {
  const { totalBalance, totalIncome, totalSpent, totalTransaction } =
    useMemo(() => {
      let income = 0;
      let expense = 0;
      transactions.forEach((tx) => {
        const amount = Number(tx.amount || 0);
        const amountType = tx.amountType || "";
        if (amountType === "income") {
          income += amount;
        } else if (amountType === "expense") {
          expense += amount;
        }
      });
      return {
        totalBalance: income - expense,
        totalIncome: income,
        totalSpent: expense,
        totalTransaction: transactions.length,
      };
    }, [transactions]);
  const cardData = [
    {
      name: "Total Balance",
      value: `₹${totalBalance.toLocaleString()}`,
      icon: <MdAccountBalanceWallet size={22} />,
      des: "Available balance",
      color: "bg-blue-600",
    },
    {
      name: "Total Income",
      value: `₹${totalIncome.toLocaleString()}`,
      icon: <FaArrowUp size={20} />,
      des: "Earnings this month",
      color: "bg-emerald-600",
    },
    {
      name: "Total Spent",
      value: `₹${totalSpent.toLocaleString()}`,
      icon: <FaArrowDown size={20} />,
      des: "Transactions this month",
      color: "bg-rose-600",
    },
    {
      name: "Total Transactions",
      value: `${totalTransaction.toString()}`,
      icon: <LuWallet size={22} />,
      des: "Recorded entries",
      color: "bg-violet-600",
    },
  ];

  return (
    <div className="w-full px-2 sm:px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {cardData.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            value={item.value}
            icon={item.icon}
            des={item.des}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
