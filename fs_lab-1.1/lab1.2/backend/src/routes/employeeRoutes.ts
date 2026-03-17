import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import { RoleService } from '../services/RoleService';
import { RoleRepository } from '../repositories/RoleRepository';

const router = Router();
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const employeeController = new EmployeeController(roleService);

router.get('/', employeeController.getAllEmployees.bind(employeeController));
router.post('/', employeeController.createEmployee.bind(employeeController));

export default router;
