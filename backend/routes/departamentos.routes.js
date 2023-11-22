import { Router } from 'express';
import { getDepartamentos, postDepartamentos } from '../controllers/departamentos.js';

const router = Router();

router.get('/', getDepartamentos);
router.post('/', postDepartamentos);

export default router;