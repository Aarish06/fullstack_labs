import { organisationData } from "../data/organisationData";
import type { Role } from "../types/role";

class OrganizationRepo {
  private roles: Role[] = [...organisationData];

  getRoles(): Role[] {
    return [...this.roles];
  }

  createRole(firstName: string, lastName: string, role: string): Role {
    const newRole: Role = {
      role,
      name: `${firstName} ${lastName}`,
    };

    this.roles.push(newRole);
    return newRole;
  }

  isRoleOccupied(role: string): boolean {
    return this.roles.some(existingRole => existingRole.role === role);
  }
}

export const organizationRepo = new OrganizationRepo();
