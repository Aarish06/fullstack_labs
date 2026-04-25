import { employeeRepo } from "../repositories/employeeRepo";

interface ServiceResult {
  success: boolean;
  message?: string;
}

class EmployeeService {
  validateName(name: string): string | null {
    if (name.trim().length < 3) {
      return "Name must be at least 3 characters.";
    }
    return null;
  }

  async createEmployee(name: string): Promise<ServiceResult> {
    const nameError = this.validateName(name);
    if (nameError) {
      return {
        success: false,
        message: nameError,
      };
    }

    try {
      await employeeRepo.createEmployee(name);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to create employee",
      };
    }
  }

  async deleteEmployee(id: string): Promise<ServiceResult> {
    try {
      await employeeRepo.deleteEmployee(id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete employee",
      };
    }
  }
}

export const employeeService = new EmployeeService();