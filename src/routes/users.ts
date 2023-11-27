import { Router } from 'express';

const router = Router();

// Mock database for demonstration
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// GET all users
router.get('/', (_, res) => {
  res.json(users);
});

// GET a single user by id
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST a new user
router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update a user
router.put('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user
router.delete('/:id', (req, res) => {
  users = users.filter((u) => u.id !== Number(req.params.id));
  res.status(204).send();
});

export default router;
