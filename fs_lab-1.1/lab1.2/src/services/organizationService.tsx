import { organizationRepo } from "../repositories/organizationRepo";

interface ServiceResult {
  success: boolean;
  message?: string;
}

interface CreateRoleData {
  firstName: string;
  lastName: string;
  role: string;
}

class OrganizationService {
  validateFirstName(firstName: string): string | null {
    if (firstName.trim().length < 3) {
      return "First name must be at least 3 characters.";
    }
    return null;
  }

  async validateRole(role: string): Promise<string | null> {
    if (role.trim().length === 0) {
      return "Role is required.";
    }

    if (await organizationRepo.isRoleOccupied(role.trim())) {
      return "This role is already occupied.";
    }

    return null;
  }

  async createRole(data: CreateRoleData): Promise<ServiceResult> {
    const firstNameError = this.validateFirstName(data.firstName);
    if (firstNameError) {
      return {
        success: false,
        message: firstNameError,
      };
    }

    const roleError = await this.validateRole(data.role);
    if (roleError) {
      return {
        success: false,
        message: roleError,
      };
    }

    try {
      await organizationRepo.createRole(
        data.firstName.trim(),
        data.lastName.trim(),
        data.role.trim()
      );

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to create role",
      };
    }
  }
}

export const organizationService = new OrganizationService();
