import { Navigate, Route, Routes } from "react-router-dom";
import Transaction from "./components/pages/Transaction";
import AddTransaction from "./components/component/AddTrasaction";
import LoginAndSignup from "./components/pages/LoginAndSignup";
import { useAuthContext } from "./context/authContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
    <Toaster/>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Transaction /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginAndSignup />}
        />
      </Routes>
    </>
  );
}

export default App;
