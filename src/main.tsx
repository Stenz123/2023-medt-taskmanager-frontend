import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404"
import Layout from "./pages/Layout";
import "./index.css";
import BoardTable from "./pages/BoardTable";
import Home from "./pages/Home";
import {Board} from "./pages/Board";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/boards" element={<BoardTable />} />
          <Route path="/board/*" element={<Board></Board>}/>
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)
