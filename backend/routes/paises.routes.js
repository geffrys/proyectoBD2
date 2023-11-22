import { Router }  from 'express';

const router = Router();

import { getPaises, postPaises } from '../controllers/paises.js';

router.get('/', getPaises);
router.post('/', postPaises);

export default router;