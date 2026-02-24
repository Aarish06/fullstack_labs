// employeeRepo.ts
import { organisationData } from "../data/organisationData";
import type { Role } from "../types/role";

class EmployeeRepo {
  private employees: Role[] = [...organisationData];

  getEmployees(): Role[] {
    return [...this.employees];
  }

  createEmployee(name: string): Role {
    const newEmployee: Role = {
      role: "New Employee",
      name,
    };

    this.employees.push(newEmployee);
    return newEmployee;
  }
}

export const employeeRepo = new EmployeeRepo();