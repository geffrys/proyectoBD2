import { Router } from 'express';
import { getCiudades, postCiudades } from '../controllers/ciudades.js';

const router = Router();

router.get('/', getCiudades);
router.post('/', postCiudades);

export default router;