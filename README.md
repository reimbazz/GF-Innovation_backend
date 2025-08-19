# GF-Innovation Backend

Backend Node.js + TypeScript para cadastro e controle de investimentos.

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie o servidor em modo desenvolvimento:
   ```
   npm run dev
   ```
   O backend ficará disponível em `http://localhost:3001`.

## Estrutura
- `src/controllers`: Recebe as requisições HTTP e chama os serviços.
- `src/services`: Regras de negócio.
- `src/repositories`: Manipulação do arquivo JSON.
- `DB/investments.json`: Base de dados local (JSON).

## Endpoints principais
- `GET    /api/investments`   - Lista todos os investimentos
- `POST   /api/investments`   - Cria um novo investimento
- `PUT    /api/investments/:id` - Atualiza um investimento
- `DELETE /api/investments/:id` - Remove um investimento

---
