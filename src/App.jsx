import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import AIChatInterface from "./playground";
import BookBrowsingApp from "./Subject";
import SidebarApp from "./Sidebar";
import { Sidebar } from "lucide-react";
import BookNav from "./BookNav";
import NavToHome from "./NavToHome";
import ChatInterface from "./chat";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BookBrowsingApp />} />
        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
