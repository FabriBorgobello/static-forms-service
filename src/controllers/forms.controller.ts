import { Request, Response } from 'express';
import { type Form } from '../models/forms.model.js';

let forms: Form[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// List
export const getForms = (_req: Request, res: Response) => {
  res.status(200).json(forms);
};

// Retrieve
export const getFormById = (req: Request, res: Response) => {
  const formId = Number(req.params.id);
  const foundForm = forms.find((form) => form.id === formId);
  if (foundForm) {
    res.status(200).json(foundForm);
  } else {
    res.status(404).json({ message: 'Form not found' });
  }
};

// Create
export const createForm = (req: Request, res: Response) => {
  const newForm: Form = req.body;
  forms.push(newForm);
  res.status(201).json({ message: 'Form added', form: newForm });
};

// Update
export const updateForm = (req: Request, res: Response) => {
  const formId = Number(req.params.id);
  const formIndex = forms.findIndex((form) => form.id === formId);
  if (formIndex > -1) {
    forms[formIndex] = { ...forms[formIndex], ...req.body };
    res.status(200).json({ message: 'Form updated', form: forms[formIndex] });
  } else {
    res.status(404).json({ message: 'Form not found' });
  }
};

// Delete
export const deleteForm = (req: Request, res: Response) => {
  const formId = Number(req.params.id);
  const newFormList = forms.filter((form) => form.id !== formId);
  if (newFormList.length !== forms.length) {
    forms = newFormList;
    res.status(200).json({ message: 'Form deleted' });
  } else {
    res.status(404).json({ message: 'Form not found' });
  }
};
