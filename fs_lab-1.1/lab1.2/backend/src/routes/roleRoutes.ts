import { Router } from 'express';
import { RoleController } from '../controllers/RoleController';
import { RoleService } from '../services/RoleService';
import { RoleRepository } from '../repositories/RoleRepository';

const router = Router();
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

router.get('/', roleController.getAllRoles.bind(roleController));
router.post('/', roleController.createRole.bind(roleController));

export default router;
