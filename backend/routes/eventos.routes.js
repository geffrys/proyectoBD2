import {Router} from 'express';
import {createEvento, getEvento, getEventos, updateEvento, deleteEvento} from '../controllers/eventos.js';

const router = Router();

router.get('/', getEventos);
router.get('/:id', getEvento);
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);

export default router;
