import { Router } from 'express';
import { TaskDataController } from './task-data.controller';
import { Role } from "@prisma/client";
import { authorize } from '../../shared/middlewares/authorize.middleware';


const router = Router();


router.use(authorize(Role.ADMIN, Role.USER));

router.get('/',     TaskDataController.getAll);
router.get('/:id',  TaskDataController.getById);
router.post('/',    TaskDataController.create);
router.patch('/:id', TaskDataController.update);
router.delete('/:id', TaskDataController.delete);

export const taskDataRoutes =  router;
