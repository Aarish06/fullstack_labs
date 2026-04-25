import { useFormInput } from "../hooks/useFormInput";
import { useEmployees, useCreateEmployee, useDeleteEmployee } from "../hooks/useEmployees";
import { useState } from "react";
import type { Role } from "../types/role";

// Import Clerk components
import { SignInButton, useUser } from "@clerk/react";

export function EmployeeForm() {
  const { isSignedIn, user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const name = useFormInput("");
  
  const { data: employeesData, isLoading, error } = useEmployees(currentPage, 10);
  const createEmployeeMutation = useCreateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee();

  // Mock role check - in production, you'd get this from Clerk
  const userRole = user?.id?.includes('admin') ? 'admin' : 
                   user?.id?.includes('moderator') ? 'moderator' : 'user';
  const canCreate = userRole === 'admin' || userRole === 'moderator';
  const canDelete = userRole === 'admin';

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
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (createEmployeeMutation.isPending) return;

    try {
      const result = await createEmployeeMutation.mutateAsync(name.value);

      if (!result.success) {
        name.setError(result.message || "");
        return;
      }

      name.setValue("");
      name.setError("");
    } catch (error) {
      name.setError("Failed to create employee");
    }
  }

  if (isLoading) {
    return <div>Loading employee data...</div>;
  }

  if (error) {
    return <div>Error loading employees: {error.message}</div>;
  }

  const employees = employeesData?.data || [];
  const pagination = employeesData?.pagination;

  return (
    <>
      {canCreate && (
        <form onSubmit={handleSubmit}>
          <input
            value={name.value}
            onChange={name.onChange}
            placeholder="Employee Name"
            disabled={createEmployeeMutation.isPending}
          />
          {name.error && <p>{name.error}</p>}
          <button type="submit" disabled={createEmployeeMutation.isPending}>
            {createEmployeeMutation.isPending ? "Adding..." : "Add Employee"}
          </button>
        </form>
      )}

      <ul>
        {employees.map((emp, index) => (
          <li key={index}>
            {emp.name} — {emp.role}
            {canDelete && (
              <button 
                onClick={() => deleteEmployeeMutation.mutate(emp.role)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {pagination && pagination.totalPages > 1 && (
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
            disabled={currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}