import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";
import { employeeRepo } from "../repositories/employeeRepo";
import { useState, useEffect } from "react";
import type { Role } from "../types/role";

// Import Clerk components
import { SignInButton } from "@clerk/react";

export function EmployeeForm() {
  // Temporarily bypass authentication to test UI
  const isSignedIn = true; // useAuth().isSignedIn;
  const name = useFormInput("");
  const [employees, setEmployees] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  if (!isSignedIn) {
    return (
      <div style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <p>Please log in to add new employees.</p>
        {SignInButton && (
          <SignInButton mode="modal">
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Log In
            </button>
          </SignInButton>
        )}
      </div>
    );
  }

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