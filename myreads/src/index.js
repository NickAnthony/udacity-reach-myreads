import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BookDetail from "./BookDetail.js";
import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search.js";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="search" element={<Search />} />
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
