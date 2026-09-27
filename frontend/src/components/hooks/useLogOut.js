import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";

const API_URL = import.meta.env.VITE_API_URL;

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logOut = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Logout failed");
      }
      localStorage.removeItem("auth-user");
      setAuthUser(null);
      toast.success("Logged out successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, logOut };
};

export default useLogOut;
