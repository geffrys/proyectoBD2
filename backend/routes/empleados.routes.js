import {Router} from 'express';
import {getEmpleados, postEmpleados, getEmpleadoById} from '../controllers/empleados.js';

const router = Router();

router.get('/', getEmpleados);
router.get('/:id', getEmpleadoById);
router.post('/', postEmpleados);

export default router;
