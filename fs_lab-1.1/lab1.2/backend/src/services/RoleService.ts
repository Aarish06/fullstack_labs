import { RoleRepository } from '../repositories/RoleRepository';
import { CreateRoleRequest, CreateEmployeeRequest, ServiceResult } from '../types/Role';

export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  validateFirstName(firstName: string): string | null {
    if (firstName.trim().length < 3) {
      return "First name must be at least 3 characters.";
    }
    return null;
  }

  validateEmployeeName(name: string): string | null {
    if (name.trim().length < 3) {
      return "Name must be at least 3 characters.";
    }
    return null;
  }

  validateRole(role: string): string | null {
    if (role.trim().length === 0) {
      return "Role is required.";
    }

    if (this.roleRepository.isRoleOccupied(role.trim())) {
      return "This role is already occupied.";
    }

    return null;
  }

  async createRole(data: CreateRoleRequest): Promise<ServiceResult> {
    const firstNameError = this.validateFirstName(data.firstName);
    if (firstNameError) {
      return {
        success: false,
        message: firstNameError,
      };
    }

    const roleError = this.validateRole(data.role);
    if (roleError) {
      return {
        success: false,
        message: roleError,
      };
    }

    const newRole = this.roleRepository.createRole(data);

    return { 
      success: true,
      data: newRole
    };
  }

  async createEmployee(data: CreateEmployeeRequest): Promise<ServiceResult> {
    const nameError = this.validateEmployeeName(data.name);
    if (nameError) {
      return {
        success: false,
        message: nameError,
      };
    }

    const newEmployee = this.roleRepository.createEmployee(data);

    return { 
      success: true,
      data: newEmployee
    };
  }

  async getAllRoles(): Promise<ServiceResult> {
    const roles = this.roleRepository.getAllRoles();
    return {
      success: true,
      data: roles
    };
  }

  async getAllEmployees(): Promise<ServiceResult> {
    const employees = this.roleRepository.getAllEmployees();
    return {
      success: true,
      data: employees
    };
  }
}
