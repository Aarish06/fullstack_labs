import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";
import { employeeRepo } from "../repositories/employeeRepo";
import { useState } from "react";
import type { Role } from "../types/role";

export function EmployeeForm() {
  const name = useFormInput("");
  const [employees, setEmployees] = useState<Role[]>(
    employeeRepo.getEmployees()
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = employeeService.createEmployee(name.value);

    if (!result.success) {
      name.setError(result.message || "");
      return;
    }

    setEmployees(employeeRepo.getEmployees());
    name.setError("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={name.value}
          onChange={name.onChange}
          placeholder="Employee Name"
        />
        {name.error && <p>{name.error}</p>}
        <button type="submit">Add Employee</button>
      </form>

      <ul>
        {employees.map((emp, index) => (
          <li key={index}>
            {emp.name} — {emp.role}
          </li>
        ))}
      </ul>
    </>
  );
}