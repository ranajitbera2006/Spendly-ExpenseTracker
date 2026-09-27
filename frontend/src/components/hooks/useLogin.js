import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const useLogin = () => {
  const [loadingLog, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logIn = async ({ formData }) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("auth-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loadingLog, logIn };
};

export default useLogin;
