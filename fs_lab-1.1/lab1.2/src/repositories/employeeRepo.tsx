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
      // Get the current session token
      const token = await this.getAuthToken();
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add auth token if available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers,
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

  private async getAuthToken(): Promise<string | null> {
    try {
      // This is a simplified approach - in a real app you'd use Clerk's getToken method
      const token = localStorage.getItem('clerk_session');
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }
}

export const employeeRepo = new EmployeeRepo();