import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { Investment } from '../models/investment';

const dbPath = path.join(__dirname, '../../DB/investments.json');

function readDB(): Investment[] {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data).investments;
}

function writeDB(investments: Investment[]) {
  fs.writeFileSync(dbPath, JSON.stringify({ investments }, null, 2));
}

function validateInvestment(investment: any) {
  const errors = [];
  if (!investment.name || typeof investment.name !== 'string') errors.push('Nome é obrigatório.');
  if (!investment.type || typeof investment.type !== 'string') errors.push('Tipo é obrigatório.');
  if (typeof investment.value !== 'number' || investment.value <= 0) errors.push('Valor deve ser maior que 0.');
  if (!investment.date || isNaN(Date.parse(investment.date))) errors.push('Data inválida.');
  else if (new Date(investment.date) > new Date()) errors.push('Data não pode estar no futuro.');
  return errors;
}

export const getAllInvestments = (req: Request, res: Response) => {
  const investments = readDB();
  res.json(investments);
};

export const createInvestment = (req: Request, res: Response) => {
  const investment = req.body;
  if (typeof investment.value === 'string') {
    investment.value = parseFloat(investment.value.replace(',', '.'));
  }
  if (typeof investment.value === 'number') {
    investment.value = Number(investment.value.toFixed(2));
  }
  const errors = validateInvestment(investment);
  if (errors.length) return res.status(400).json({ errors });
  const newInvestment: Investment = { ...investment, id: uuidv4() };
  const investments = readDB();
  investments.push(newInvestment);
  writeDB(investments);
  res.status(201).json(newInvestment);
};

export const updateInvestment = (req: Request, res: Response) => {
  const { id } = req.params;
  const investment = req.body;
  if (typeof investment.value === 'string') {
    investment.value = parseFloat(investment.value.replace(',', '.'));
  }
  if (typeof investment.value === 'number') {
    investment.value = Number(investment.value.toFixed(2));
  }
  const errors = validateInvestment(investment);
  if (errors.length) return res.status(400).json({ errors });
  let investments = readDB();
  const idx = investments.findIndex((inv: Investment) => inv.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Não encontrado.' });
  investments[idx] = { ...investments[idx], ...investment };
  writeDB(investments);
  res.json(investments[idx]);
};

export const deleteInvestment = (req: Request, res: Response) => {
  const { id } = req.params;
  let investments = readDB();
  const idx = investments.findIndex((inv: Investment) => inv.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Não encontrado.' });
  const [removed] = investments.splice(idx, 1);
  writeDB(investments);
  res.json(removed);
};
