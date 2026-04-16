import { useRoleForm } from "../hooks/useRoleForm";
import { SignInButton } from "@clerk/react";

export function RoleForm() {
  // Temporarily bypass authentication to test UI
  const isSignedIn = true; // useAuth().isSignedIn;
  const { formData, errors, submitting, updateField, submitForm, resetForm } = useRoleForm();
  
  if (!isSignedIn) {
    return (
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1rem', 
        border: '1px solid #ccc', 
        borderRadius: '4px', 
        textAlign: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <h3>Add New Role</h3>
        <p>Please log in to add new roles.</p>
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

    try {
      const result = await submitForm();
      
      if (result.success) {
        resetForm();
        // Trigger a refresh of the organization data
        window.dispatchEvent(new CustomEvent('roleCreated'));
      } else {
        // Error is already set in the form state
        console.error(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h3>Add New Role</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.25rem' }}>
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="Enter first name (min 3 characters)"
            disabled={submitting}
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: errors.firstName ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              opacity: submitting ? 0.6 : 1
            }}
          />
          {errors.firstName && (
            <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="Enter last name"
            disabled={submitting}
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: errors.lastName ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              opacity: submitting ? 0.6 : 1
            }}
          />
          {errors.lastName && (
            <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.lastName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Role:
          </label>
          <input
            id="role"
            type="text"
            value={formData.role}
            onChange={(e) => updateField('role', e.target.value)}
            placeholder="Enter role title"
            disabled={submitting}
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: errors.role ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              opacity: submitting ? 0.6 : 1
            }}
          />
          {errors.role && (
            <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.role}
            </p>
          )}
        </div>

        <button 
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: submitting ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1
          }}
        >
          {submitting ? 'Adding...' : 'Add Role'}
        </button>
      </form>
    </div>
  );
}
