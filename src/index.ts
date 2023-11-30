import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import usersRouter from '@/users/users.route';
import authRouter from '@/auth/auth.route';
import { errorHandler } from './utils/error-handler';

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
app.use('/api/auth', authRouter);

// Health Check
app.get('/health', (_, res) => {
  res.status(200).json({ ok: true });
});

// Error Handler
app.use(errorHandler);

app.get('*', (_, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
