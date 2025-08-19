"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const dbPath = path_1.default.join(__dirname, '../../DB/investments.json');
function readDB() {
    const data = fs_1.default.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data).investments;
}
function writeDB(investments) {
    fs_1.default.writeFileSync(dbPath, JSON.stringify({ investments }, null, 2));
}
function validateInvestment(investment) {
    const errors = [];
    if (!investment.name || typeof investment.name !== 'string')
        errors.push('Nome é obrigatório.');
    if (!investment.type || typeof investment.type !== 'string')
        errors.push('Tipo é obrigatório.');
    if (typeof investment.value !== 'number' || investment.value <= 0)
        errors.push('Valor deve ser maior que 0.');
    if (!investment.date || isNaN(Date.parse(investment.date)))
        errors.push('Data inválida.');
    else if (new Date(investment.date) > new Date())
        errors.push('Data não pode estar no futuro.');
    return errors;
}
// Listar todos
router.get('/', (req, res) => {
    const investments = readDB();
    res.json(investments);
});
// Criar novo
router.post('/', (req, res) => {
    const investment = req.body;
    const errors = validateInvestment(investment);
    if (errors.length)
        return res.status(400).json({ errors });
    const newInvestment = { ...investment, id: (0, uuid_1.v4)() };
    const investments = readDB();
    investments.push(newInvestment);
    writeDB(investments);
    res.status(201).json(newInvestment);
});
// Atualizar
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const investment = req.body;
    const errors = validateInvestment(investment);
    if (errors.length)
        return res.status(400).json({ errors });
    let investments = readDB();
    const idx = investments.findIndex((inv) => inv.id === id);
    if (idx === -1)
        return res.status(404).json({ error: 'Não encontrado.' });
    investments[idx] = { ...investments[idx], ...investment };
    writeDB(investments);
    res.json(investments[idx]);
});
// Deletar
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let investments = readDB();
    const idx = investments.findIndex((inv) => inv.id === id);
    if (idx === -1)
        return res.status(404).json({ error: 'Não encontrado.' });
    const [removed] = investments.splice(idx, 1);
    writeDB(investments);
    res.json(removed);
});
exports.default = router;
