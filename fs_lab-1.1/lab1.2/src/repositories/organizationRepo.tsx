import type { Role } from "../types/role";

const API_BASE_URL = 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class OrganizationRepo {
  async getRoles(): Promise<Role[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/roles`);
      const result: ApiResponse<Role[]> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error(result.message || 'Failed to fetch roles');
    } catch (error) {
      console.error('Error fetching roles:', error);
      return [];
    }
  }

  async createRole(firstName: string, lastName: string, role: string): Promise<Role> {
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
      
      const response = await fetch(`${API_BASE_URL}/roles`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ firstName, lastName, role }),
      });
      
      const result: ApiResponse<Role> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error(result.message || 'Failed to create role');
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  async isRoleOccupied(role: string): Promise<boolean> {
    try {
      const roles = await this.getRoles();
      return roles.some(existingRole => existingRole.role === role);
    } catch (error) {
      console.error('Error checking if role is occupied:', error);
      return false;
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

export const organizationRepo = new OrganizationRepo();
