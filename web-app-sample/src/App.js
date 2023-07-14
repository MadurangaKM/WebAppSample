import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components";
import { Login, MyContacts, Profile, EditProfile } from "./pages";
import { ProtectedRoute } from "./Routers/ProtectedRoute";

function App() {
  const storedUserData = localStorage.getItem("userData");
  return (
    <div className="main">
      <NavBar />

      {/* <div className="main">
      <NavBar/>
     <Login className="center"/>
    </div> */}
      <Routes>
        <Route path="/" element={storedUserData ? <MyContacts /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
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
