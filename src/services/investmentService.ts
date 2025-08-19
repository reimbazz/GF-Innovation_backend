import { v4 as uuidv4 } from 'uuid';
import { investmentRepository } from '../repositories/investmentRepository';

function validateInvestment(investment: any) {
  const errors = [];
  if (!investment.name || typeof investment.name !== 'string') errors.push('Nome é obrigatório.');
  if (!investment.type || typeof investment.type !== 'string') errors.push('Tipo é obrigatório.');
  if (typeof investment.value !== 'number' || investment.value <= 0) errors.push('Valor deve ser maior que 0.');
  if (!investment.date || isNaN(Date.parse(investment.date))) errors.push('Data inválida.');
  else if (new Date(investment.date) > new Date()) errors.push('Data não pode estar no futuro.');
  return errors;
}

// Service com regras de negócio para investimentos
export const investmentService = {
  /**
   * Retorna todos os investimentos cadastrados.
   * Não recebe parâmetros.
   * @returns {Array} Lista de investimentos
   */
  getAll() {
    return investmentRepository.findAll();
  },
  /**
   * Cria um novo investimento após validar os dados.
   * @param {Object} investment - Dados do investimento
   * @returns {Object} Novo investimento criado ou objeto de erros
   */
  create(investment: any) {
    if (typeof investment.value === 'string') {
      investment.value = parseFloat(investment.value.replace(',', '.'));
    }
    if (typeof investment.value === 'number') {
      investment.value = Number(investment.value.toFixed(2));
    }
    const errors = validateInvestment(investment);
    if (errors.length) return { errors };
    const newInvestment = { ...investment, id: uuidv4() };
    const investments = investmentRepository.findAll();
    investments.push(newInvestment);
    investmentRepository.saveAll(investments);
    return newInvestment;
  },
  /**
   * Atualiza um investimento existente pelo id.
   * @param {string} id - ID do investimento
   * @param {Object} investment - Novos dados do investimento
   * @returns {Object} Investimento atualizado, erros ou mensagem de não encontrado
   */
  update(id: string, investment: any) {
    if (typeof investment.value === 'string') {
      investment.value = parseFloat(investment.value.replace(',', '.'));
    }
    if (typeof investment.value === 'number') {
      investment.value = Number(investment.value.toFixed(2));
    }
    const errors = validateInvestment(investment);
    if (errors.length) return { errors };
    let investments = investmentRepository.findAll();
    const idx = investments.findIndex((inv: any) => inv.id === id);
    if (idx === -1) return { error: 'Não encontrado.' };
    investments[idx] = { ...investments[idx], ...investment };
    investmentRepository.saveAll(investments);
    return investments[idx];
  },
  /**
   * Remove um investimento pelo id.
   * @param {string} id - ID do investimento
   * @returns {Object} Investimento removido ou mensagem de não encontrado
   */
  delete(id: string) {
    let investments = investmentRepository.findAll();
    const idx = investments.findIndex((inv: any) => inv.id === id);
    if (idx === -1) return { error: 'Não encontrado.' };
    const [removed] = investments.splice(idx, 1);
    investmentRepository.saveAll(investments);
    return removed;
  }
};
