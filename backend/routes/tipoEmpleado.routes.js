import {Router} from 'express';
import {getTiposEmpleados, postTiposEmpleados} from '../controllers/tiposEmpleados.js';

const router = Router();

router.get('/', getTiposEmpleados);
router.post('/', postTiposEmpleados);

export default router;