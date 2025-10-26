import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Historical from "./pages/Historical";
import MachinesOverview from "./pages/MachinesOverview";
import Settings from "./pages/Settings";
// import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historical" element={<Historical />} />
          <Route path="/machines" element={<MachinesOverview />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
