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

  validateRole(role: string): string | null {
    if (role.trim().length === 0) {
      return "Role is required.";
    }

    if (organizationRepo.isRoleOccupied(role.trim())) {
      return "This role is already occupied.";
    }

    return null;
  }

  createRole(data: CreateRoleData): ServiceResult {
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

    organizationRepo.createRole(
      data.firstName.trim(),
      data.lastName.trim(),
      data.role.trim()
    );

    return { success: true };
  }
}

export const organizationService = new OrganizationService();
