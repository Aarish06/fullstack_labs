import { Request, Response } from 'express';
import { RoleService } from '../services/RoleService';
import { CreateRoleRequest } from '../types/Role';

export class RoleController {
  constructor(private roleService: RoleService) {}

  async getAllRoles(req: Request, res: Response) {
    try {
      const result = await this.roleService.getAllRoles();
      
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

  async createRole(req: Request, res: Response) {
    try {
      const { firstName, lastName, role } = req.body as CreateRoleRequest;

      if (!firstName || !lastName || !role) {
        return res.status(400).json({
          success: false,
          message: 'First name, last name, and role are required'
        });
      }

      const result = await this.roleService.createRole({ firstName, lastName, role });
      
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
