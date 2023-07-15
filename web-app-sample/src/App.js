import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components";
import { Login, MyContacts, Profile } from "./pages";
import { ProtectedRoute } from "./Routers/ProtectedRoute";

function App() {
  const storedUserData = localStorage.getItem("userData");
  return (
    <div className="main">
      <NavBar />
      <Routes>
        <Route path="/" element={storedUserData ? <MyContacts /> : <Login />} />
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
      </Routes>
    </div>
  );
}

export default App;
