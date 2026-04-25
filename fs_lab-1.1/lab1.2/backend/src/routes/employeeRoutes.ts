import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import { RoleService } from '../services/RoleService';
import { RoleRepository } from '../repositories/RoleRepository';
import { requireAdmin, requireModerator } from '../middleware/roleAuth';

const router = Router();
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const employeeController = new EmployeeController(roleService);

router.get('/', employeeController.getAllEmployees.bind(employeeController));
router.post('/', requireModerator, employeeController.createEmployee.bind(employeeController));
router.delete('/:id', requireAdmin, employeeController.deleteEmployee.bind(employeeController));

export default router;
