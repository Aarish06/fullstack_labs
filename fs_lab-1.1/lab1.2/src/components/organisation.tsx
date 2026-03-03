import { useState, useEffect } from "react";
import { organizationRepo } from "../repositories/organizationRepo";
import { RoleForm } from "./roleForm";
import type { Role } from "../types/role";

export function Organisation() {
  const [roles, setRoles] = useState<Role[]>(organizationRepo.getRoles());

  useEffect(() => {
    const handleRoleCreated = () => {
      setRoles(organizationRepo.getRoles());
    };

    window.addEventListener('roleCreated', handleRoleCreated);
    
    return () => {
      window.removeEventListener('roleCreated', handleRoleCreated);
    };
  }, []);

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
