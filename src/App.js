


import React from "react";
import {Route, Routes } from "react-router-dom";
import Login from "./Component/Login/Login";
import TablePage from "./Component/TablePage";
import "./App.css";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
   
  );
}

export default App;