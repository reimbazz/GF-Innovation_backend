import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../DB/investments.json');

// Repository para manipulação dos dados de investimentos no arquivo JSON

export const investmentRepository = {
  /**
   * Retorna todos os investimentos cadastrados no arquivo JSON.
   * Não recebe parâmetros.
   * @returns {Array} Lista de investimentos
   */
  findAll() {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data).investments;
  },
  /**
   * Salva a lista de investimentos no arquivo JSON.
   * @param {Array} investments - Lista de investimentos a ser salva
   * Não retorna nada.
   */
  saveAll(investments: any[]) {
    fs.writeFileSync(dbPath, JSON.stringify({ investments }, null, 2));
  }
};
