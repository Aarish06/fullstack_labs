import type { Role } from "../types/role";

const API_BASE_URL = 'http://localhost:3001/api';

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
      const response = await fetch(`${API_BASE_URL}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
}

export const organizationRepo = new OrganizationRepo();
