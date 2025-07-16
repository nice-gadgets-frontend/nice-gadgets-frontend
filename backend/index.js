import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registerUser from './register.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Логування всіх запитів (це краще поставити після маршрутів, але поки можна так)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Роут для кореневого шляху '/'
app.get('/', (_req, res) => {
    console.log('Отримано GET запит на /');
  res.send('Backend server is running');
});

// Роут для реєстрації
app.post('/api/register', async (req, res) => {
  console.log('POST /api/register отримано:', req.body);
  try {
    await registerUser(req, res);
    console.log('registerUser успішно завершився');
  } catch (error) {
    console.error('registerUser викликав помилку:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
