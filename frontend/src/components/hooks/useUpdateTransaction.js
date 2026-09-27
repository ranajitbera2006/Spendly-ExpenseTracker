import { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useUpdateTransaction = () => {
  const [loading, setLoading] = useState(false);

  const updateTransaction = async (updatedData) => {
   
    const transactionId = updatedData._id || updatedData.id;
     setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/transaction/updateTransaction/${transactionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            description: updatedData.description,
            amount: updatedData.amount,
            category: updatedData.category.toLowerCase(),
            date: updatedData.date,
            amountType: updatedData.amountType.toLowerCase(),
          }),
        },
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Transaction updated successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateTransaction };
};

export default useUpdateTransaction;
