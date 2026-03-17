import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";
import { employeeRepo } from "../repositories/employeeRepo";
import { useState, useEffect } from "react";
import type { Role } from "../types/role";

export function EmployeeForm() {
  const name = useFormInput("");
  const [employees, setEmployees] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const employeesData = await employeeRepo.getEmployees();
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);
      const result = await employeeService.createEmployee(name.value);

      if (!result.success) {
        name.setError(result.message || "");
        return;
      }

      await loadEmployees();
      name.setValue("");
      name.setError("");
    } catch (error) {
      name.setError("Failed to create employee");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div>Loading employee data...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={name.value}
          onChange={name.onChange}
          placeholder="Employee Name"
          disabled={submitting}
        />
        {name.error && <p>{name.error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Employee"}
        </button>
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