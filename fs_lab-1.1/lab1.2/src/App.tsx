import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { Layout } from "./components/layout";
import { EmployeeList } from "./components/employeelist";
import { EmployeeForm } from "./components/form";
import { Organisation } from "./components/organisation";

function App() {
  const [employees, setEmployees] = useState<string[]>([]);

  const addEmployee = (name: string) => {
    setEmployees([...employees, name]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/employees" />} />

          <Route
            path="employees"
            element={
              <>
                <EmployeeList employees={employees} />
                <EmployeeForm addEmployee={addEmployee} />
              </>
            }
          />

          <Route path="organization" element={<Organisation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
