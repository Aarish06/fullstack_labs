import { useEffect, useState } from "react";
import { employeeRepo } from "../repositories/employeeRepo";
import type { Role } from "../types/role";

export function EmployeeList() {
  const [employees, setEmployees] = useState<Role[]>([]);

  useEffect(() => {
    setEmployees(employeeRepo.getEmployees());
  }, []);

  return (
    <ul>
      {employees.map((emp, index) => (
        <li key={index}>
          {emp.name} — {emp.role}
        </li>
      ))}
    </ul>
  );
}