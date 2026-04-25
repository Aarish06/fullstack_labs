export interface Role {
  role: string;
  name: string;
}

export interface CreateRoleRequest {
  firstName: string;
  lastName: string;
  role: string;
}

export interface CreateEmployeeRequest {
  name: string;
}

export interface ServiceResult {
  success: boolean;
  message?: string;
  data?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
