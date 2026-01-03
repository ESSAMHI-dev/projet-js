import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/dashboard/Home";
import Expense from "./pages/dashboard/Expense";
import Income from "./pages/dashboard/Income";
import UserProvider from "./context/UserContext";
import ThemeProvider from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "react-hot-toast";
import Factures from "./pages/dashboard/Factures";
import Profile from "./pages/dashboard/Profile";
import "./i18n";

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <div>
            <Router>
              <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<SignUp />} />
                <Route path="/dashboard" exact element={<Home />} />
                <Route path="/income" exact element={<Income />} />
                <Route path="/expense" exact element={<Expense />} />
                <Route path="/profile" exact element={<Profile />} />
                <Route path="/Factures" exact element={<Factures />} />
              </Routes>
            </Router>
          </div>

          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;

const Root = () => {
  //Check if token is exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }
};
