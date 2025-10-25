import { useState } from "react";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";

// import "./App.css";

function App() {
  return (
    <div className="h-screen w-screen bg-gray-900">
      <Header></Header>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
