import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Main } from "./components/Main";
import { useState } from "react";
import { RequireAuth } from "./RequireAuth";
import { RequireGuest } from "./RequireGuest";
import "./App.css";

export const App = () => {
  

  return (
    <Router>
      {<Navbar />}
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        } />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={
          <RequireGuest>
            <Login />
          </RequireGuest>
        } />

        <Route path="/register" element={
          <RequireGuest>
            <Register />
          </RequireGuest>
        } />
        <Route path="/home" element={
          <RequireGuest>
            <Home />
          </RequireGuest>
        } />
      </Routes>
    </Router>
  );
}
