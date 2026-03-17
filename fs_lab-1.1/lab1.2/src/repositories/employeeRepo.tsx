// employeeRepo.ts
import type { Role } from "../types/role";

const API_BASE_URL = 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class EmployeeRepo {
  async getEmployees(): Promise<Role[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      const result: ApiResponse<Role[]> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error(result.message || 'Failed to fetch employees');
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  }

  async createEmployee(name: string): Promise<Role> {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      const result: ApiResponse<Role> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error(result.message || 'Failed to create employee');
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }
}

export const employeeRepo = new EmployeeRepo();