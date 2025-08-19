
import { Router } from 'express';
import {
  getAllInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment
} from '../controllers/investmentsController';

const router = Router();

router.get('/', getAllInvestments);
router.post('/', createInvestment);
router.put('/:id', updateInvestment);
router.delete('/:id', deleteInvestment);

export default router;
