import { useRoleForm } from "../hooks/useRoleForm";

export function RoleForm() {
  const { formData, errors, updateField, submitForm, resetForm } = useRoleForm();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = submitForm();
    
    if (result.success) {
      resetForm();
      // We'll need to trigger a refresh of the organization data
      // This will be handled by the parent component
      window.dispatchEvent(new CustomEvent('roleCreated'));
    } else {
      // Error is already set in the form state
      console.error(result.message);
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
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: errors.firstName ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
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
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: errors.lastName ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
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
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: errors.role ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
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
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Role
        </button>
      </form>
    </div>
  );
}
