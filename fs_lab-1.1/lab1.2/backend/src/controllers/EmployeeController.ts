import { Request, Response } from 'express';
import { RoleService } from '../services/RoleService';
import { CreateEmployeeRequest } from '../types/Role';
import { AuthenticatedRequest } from '../middleware/roleAuth';

export class EmployeeController {
  constructor(private roleService: RoleService) {}

  async getAllEmployees(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.roleService.getAllEmployees(page, limit);
      
      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.data,
          pagination: result.pagination
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async createEmployee(req: AuthenticatedRequest, res: Response) {
    try {
      const { name } = req.body as CreateEmployeeRequest;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Name is required'
        });
      }

      const result = await this.roleService.createEmployee({ name });
      
      if (result.success) {
        res.status(201).json({
          success: true,
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async deleteEmployee(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID is required'
        });
      }

      const result = await this.roleService.deleteEmployee(id);
      
      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Employee deleted successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}
