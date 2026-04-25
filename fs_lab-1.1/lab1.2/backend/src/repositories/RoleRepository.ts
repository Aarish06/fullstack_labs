import { Role, CreateRoleRequest, CreateEmployeeRequest } from '../types/Role';

export class RoleRepository {
  private roles: Role[] = [
    { role: "CEO / Chair of Board", name: "Jo-Anne Sinclair" },
    { role: "COO / VP Operations", name: "Jackson Smith" },
    { role: "CFO / VP Administration", name: "Susan Thomas" },
    { role: "VP Client Services", name: "Richa Kaur" },
    { role: "CIO", name: "Josee Benjamin" },
    { role: "VP Sales & Marketing", name: "Vincent Grey" },
    { role: "Director Financial and Audit Svcs", name: "Rupa Kharki (she/her/hers)" },
    { role: "Director Human Resources", name: "Xun Kuang" },
    { role: "Director Legal Services / General Counsel", name: "Stien Pedersen" },
    { role: "Director Information Technology", name: "Sandra Bear" },
    { role: "Director Information Security and CISS0", name: "Gus Blue" },
    { role: "Director Accounting", name: "Sam Kong" },
    { role: "Director Physical Security", name: "Valentine Smith" },
    { role: "Director Facilities", name: "Mariya Kaperski" },
    { role: "Manager, Business Continuity and Disaster Recovery", name: "Abd al-Hamid Alami" },
    { role: "Manager, Internal Audit", name: "Victoria Gray" },
    { role: "Chief Architect", name: "Cheryl Guru" },
    { role: "Manager, Security Architecture", name: "Jean Ngoy" },
    { role: "Solution Architect, Online Banking", name: "Kris Gold" },
    { role: "Manager, Application Solutions", name: "Isaac Smith" },
    { role: "Lead Developer, Online Banking", name: "Payton Frost" },
    { role: "Manager, Operational Risk", name: "Samantha Nettle" },
    { role: "Manager, Vendor Relations", name: "Yolanda Ferreira" },
    { role: "Manager, Purchasing", name: "Samir Hassan" },
    { role: "Manager, Communications", name: "Yuna Aikawa" },
    { role: "Manager Customer Experience and Community Engagement", name: "Jonathan Carberry" },
  ];

  private employees: Role[] = [];

  getAllRoles(): Role[] {
    return [...this.roles];
  }

  getAllEmployees(): Role[] {
    return [...this.employees];
  }

  createRole(data: CreateRoleRequest): Role {
    const newRole: Role = {
      role: data.role.trim(),
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
    };

    this.roles.push(newRole);
    return newRole;
  }

  createEmployee(data: CreateEmployeeRequest): Role {
    const newEmployee: Role = {
      role: "New Employee",
      name: data.name.trim(),
    };

    this.employees.push(newEmployee);
    return newEmployee;
  }

  isRoleOccupied(role: string): boolean {
    return this.roles.some(existingRole => existingRole.role === role);
  }

  deleteEmployee(id: string): boolean {
    const index = this.employees.findIndex(emp => emp.role === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return true;
    }
    return false;
  }
}
