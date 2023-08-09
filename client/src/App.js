import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Basic from "./pages/Basic";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import Pay from "./pages/Pay";
import Confirm from "./pages/Confirm";
import Milk from "./pages/Milk";
import Cleaning from "./pages/Cleaning";
import Frozen from "./pages/Frozen";
import Fruit from "./pages/Fruit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="Home" element={<Users />}>
          <Route path="Cleaning" element={<Cleaning />} />
          <Route path="Basic" element={<Basic />} />
          <Route path="Milk" element={<Milk />} />
          <Route path="Frozen" element={<Frozen />} />
          <Route path="Fruit" element={<Fruit />} />
          <Route path=":id/Info" element={<Info />} />
          <Route path=":id/ShoppingCart" element={<ShoppingCart />} />
          <Route path=":id/Pay" element={<Pay />} />
          <Route path="Confirm" element={<Confirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
