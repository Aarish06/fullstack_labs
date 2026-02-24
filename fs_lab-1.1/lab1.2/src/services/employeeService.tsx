import { employeeRepo } from "../repositories/employeeRepo";

interface ServiceResult {
  success: boolean;
  message?: string;
}

class EmployeeService {
  createEmployee(name: string): ServiceResult {
    if (name.trim().length < 3) {
      return {
        success: false,
        message: "Name must be at least 3 characters.",
      };
    }

    employeeRepo.createEmployee(name);

    return { success: true };
  }
}

export const employeeService = new EmployeeService();