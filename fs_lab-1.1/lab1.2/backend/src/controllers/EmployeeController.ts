import { Request, Response } from 'express';
import { RoleService } from '../services/RoleService';
import { CreateEmployeeRequest } from '../types/Role';

export class EmployeeController {
  constructor(private roleService: RoleService) {}

  async getAllEmployees(req: Request, res: Response) {
    try {
      const result = await this.roleService.getAllEmployees();
      
      if (result.success) {
        res.status(200).json({
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

  async createEmployee(req: Request, res: Response) {
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
}
