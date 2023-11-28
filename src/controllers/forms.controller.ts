import { pool } from '@/database';
import { Request, Response } from 'express';

// List
export const getForms = (_req: Request, res: Response) => {
  pool.query('SELECT * FROM forms', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results.rows);
  });
};

// Retrieve
export const getFormById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  pool.query('SELECT * FROM forms WHERE id = $1', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }
    res.status(200).json(results.rows[0]);
  });
};

// Create
export const createForm = (req: Request, res: Response) => {
  const { name, description } = req.body;

  pool.query(
    'INSERT INTO forms (name, description) VALUES ($1, $2) RETURNING *', // Return the entire row
    [name, description],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(201).json(results.rows[0]);
    },
  );
};

// Update
export const updateForm = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;

  pool.query(
    'UPDATE forms SET name = $1, description = $2 WHERE id = $3 RETURNING *', // Return the updated row
    [name, description, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.rowCount === 0) {
        res.status(404).json({ error: 'Form not found' });
        return;
      }
      res.status(200).json(results.rows[0]);
    },
  );
};

// Delete
export const deleteForm = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  pool.query('DELETE FROM forms WHERE id = $1', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.rowCount === 0) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }
    res.sendStatus(204); // No content
  });
};
