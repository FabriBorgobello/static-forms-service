import { Router } from 'express';

const router = Router();

// Mock database for demonstration
let forms = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// GET all forms
router.get('/', (_, res) => {
  res.json(forms);
});

// GET a single form by id
router.get('/:id', (req, res) => {
  const form = forms.find((u) => u.id === Number(req.params.id));
  if (form) {
    res.json(form);
  } else {
    res.status(404).json({ message: 'Form not found' });
  }
});

// POST a new form
router.post('/', (req, res) => {
  const newForm = {
    id: forms.length + 1,
    name: req.body.name,
  };
  forms.push(newForm);
  res.status(201).json(newForm);
});

// PUT to update a form
router.put('/:id', (req, res) => {
  const form = forms.find((u) => u.id === Number(req.params.id));
  if (form) {
    form.name = req.body.name;
    res.json(form);
  } else {
    res.status(404).send('Form not found');
  }
});

// DELETE a form
router.delete('/:id', (req, res) => {
  forms = forms.filter((u) => u.id !== Number(req.params.id));
  res.status(204).send();
});

export default router;
