import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404"
import Layout from "./pages/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/boards" element={<h1>This is the board overview page</h1>} />
          <Route path="/board" element={<h1>This is the board page</h1>} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)
