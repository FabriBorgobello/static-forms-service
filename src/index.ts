import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import formsRouter from '@/routes/forms.route';
import usersRouter from '@/routes/users.route';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/forms', formsRouter);

// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: error.message });
  next(error);
});

// Health Check
app.get('/health', (_, res) => {
  res.status(200).json({ ok: true });
});

app.get('*', (_, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
