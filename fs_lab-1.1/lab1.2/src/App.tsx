import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/layout";

import { EmployeeForm } from "./components/form";
import { Organisation } from "./components/organisation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/employees" />} />

          <Route
            path="employees"
            element={<EmployeeForm />}
          />

          <Route path="organization" element={<Organisation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;