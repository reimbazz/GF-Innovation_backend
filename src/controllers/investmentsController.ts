import { Request, Response } from 'express';
import { investmentService } from '../services/investmentService';

/**
 * Controller: Retorna todos os investimentos cadastrados.
 * @route GET /api/investments
 */
export const getAllInvestments = (req: Request, res: Response) => {
  const investments = investmentService.getAll();
  return res.json(investments);
};

/**
 * Controller: Cria um novo investimento.
 * @route POST /api/investments
 * @body {Object} Dados do investimento
 */
export const createInvestment = (req: Request, res: Response) => {
  const result = investmentService.create(req.body);
  if ('errors' in result) return res.status(400).json({ errors: result.errors });
  return res.status(201).json(result);
};

/**
 * Controller: Atualiza um investimento pelo id.
 * @route PUT /api/investments/:id
 * @param {string} id - ID do investimento
 * @body {Object} Novos dados do investimento
 */
export const updateInvestment = (req: Request, res: Response) => {
  const id = req.params.id;
  const result = investmentService.update(id, req.body);
  if ('errors' in result) return res.status(400).json({ errors: result.errors });
  if ('error' in result) return res.status(404).json({ error: result.error });
  return res.json(result);
};

/**
 * Controller: Remove um investimento pelo id.
 * @route DELETE /api/investments/:id
 * @param {string} id - ID do investimento
 */
export const deleteInvestment = (req: Request, res: Response) => {
  const id = req.params.id;
  const result = investmentService.delete(id);
  if ('error' in result) return res.status(404).json({ error: result.error });
  return res.json(result);
};

