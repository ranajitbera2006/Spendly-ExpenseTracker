import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useGetTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = useCallback(async (search = "") => {
    // Fixed: added '?' instead of '/'
    const url = search
      ? `${API_URL}/api/transaction/getTransaction?search=${encodeURIComponent(search)}`
      : `${API_URL}/api/transaction/getTransaction`;

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch transactions");
      }

      // Fixed: extract json.data instead of json directly
      const list = Array.isArray(json.data)
        ? json.data
        : Array.isArray(json)
          ? json
          : [];
      setTransactions(list);
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return { loading, transactions, setTransactions, getTransactions };
};

export default useGetTransaction;
