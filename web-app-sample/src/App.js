import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components";
import { Login, MyContacts, Profile } from "./pages";
import { ProtectedRoute } from "./Routers/ProtectedRoute";

function App() {
  const storedUserData = localStorage.getItem("userData");
  const isLogout = JSON.parse(localStorage.getItem("logout"));
  return (
    <div className="main">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={storedUserData && !isLogout ? <MyContacts /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <Profile isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <MyContacts />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "lighter",
        }}
        onClick={() => {
          window.open("https://www.maduranga.me/", "_blank");
        }}
      >
        <p>© {new Date().getFullYear()} maduranga.me</p>
      </div>
    </div>
  );
}

export default App;
