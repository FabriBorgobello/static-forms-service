import 'dotenv/config';
import '@/auth/passport';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import authRouter from '@/auth/auth.route';
import userRouter from '@/user/user.route';
import formRouter from '@/form/form.route';
import submissionRouter from '@/submission/submission.route';

import { errorHandler } from './utils/error-handler';
import { env } from '@/config';
import { admin, authenticated } from './auth/middlewares';

const app = express();
const port = env.PORT;

app.use(morgan('dev')); // Logging
app.use(helmet()); // Security
app.use(cors()); // CORS
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser
app.use(express.static('public')); // Serve static files

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/form', formRouter);
app.use('/api/form/:form_id/submission', submissionRouter);

app.get('/api/unprotected', (_, res) => {
  res.status(200).json({ message: 'Unprotected route' });
});

app.get('/api/protected', authenticated, (_, res) => {
  res.status(200).json({ message: 'Protected route' });
});

app.get('/api/admin', admin, (_, res) => {
  res.status(200).json({ message: 'Admin route' });
});

// Health Check
app.get('/health', (_, res) => {
  res.status(200).json({ ok: true });
});

// Error Handler
app.use(errorHandler);

// app.get('*', (_, res) => {
//   res.redirect('/');
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
