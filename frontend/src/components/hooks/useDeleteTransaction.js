import React, { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useDeleteTransaction = () => {
  const [loading, setLoading] = useState(false);
  const deleteTransaction = async ({
    transactionId,
    description,
    amount,
    category,
    date,
    amountType,
  }) => {
    try {
      const res = await fetch(
        `${API_URL}/api/transaction/deleteTransaction/${transactionId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            description,
            amount,
            category,
            date,
            amountType,
          }),
        },
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Transaction deleted successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteTransaction };
};

export default useDeleteTransaction;
