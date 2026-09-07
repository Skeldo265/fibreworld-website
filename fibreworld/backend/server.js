import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactRouter from './routes/contact.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/contact', contactRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Fibre World API running on http://localhost:${PORT}`);
});
