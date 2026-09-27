import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";

const API_URL = import.meta.env.VITE_API_URL;

const useAddTransaction = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const addTransaction = async (transactionData) => {
    console.log(transactionData);
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transaction/addTransaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user: authUser?._id,
          description: transactionData.description,
          amount: transactionData.amount,
          category: transactionData.category,
          date: transactionData.date,
          amountType: transactionData.amountType,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to create transaction");
      }

      toast.success("Transaction added successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, addTransaction };
};

export default useAddTransaction;
