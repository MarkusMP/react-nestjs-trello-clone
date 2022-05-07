import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { authenticated } from "./features/auth/authSlice";
import Profile from "./pages/Profile/Profile";
import Board from "./pages/Board/Board";
import Home from "./pages/Home/Home";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticated());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="board/:boardId"
            element={<ProtectedRoute component={Board} />}
          />
        </Routes>
      </Router>
      <ToastContainer autoClose={4000} />
    </>
  );
}

export default App;
