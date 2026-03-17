import { useState, useEffect } from "react";
import { organizationRepo } from "../repositories/organizationRepo";
import { RoleForm } from "./roleForm";
import type { Role } from "../types/role";

export function Organisation() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const rolesData = await organizationRepo.getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();

    const handleRoleCreated = () => {
      loadRoles();
    };

    window.addEventListener('roleCreated', handleRoleCreated);
    
    return () => {
      window.removeEventListener('roleCreated', handleRoleCreated);
    };
  }, []);

  if (loading) {
    return <div>Loading organization data...</div>;
  }

  return (
    <>
      <h2>Organization</h2>
      
      <RoleForm />

      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((item, index) => (
            <tr key={index}>
              <td>{item.role}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
