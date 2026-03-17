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

export interface ServiceResult<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}
