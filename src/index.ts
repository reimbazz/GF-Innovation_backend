import express from 'express';
import cors from 'cors';
import { getAllInvestments, createInvestment, updateInvestment, deleteInvestment } from './controllers/investmentsController';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


app.get('/api/investments', getAllInvestments);
app.post('/api/investments', createInvestment);
app.put('/api/investments/:id', updateInvestment);
app.delete('/api/investments/:id', deleteInvestment);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
