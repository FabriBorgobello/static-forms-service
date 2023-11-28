import { NextFunction, Request, Response } from 'express';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    res.status(200).json({ ok: true, body });
  } catch (error) {
    next(error);
  }
};
export const signUp = async (req: Request, res: Response, next: NextFunction) => {};
export const signOut = async (req: Request, res: Response, next: NextFunction) => {};
export const getMe = async (req: Request, res: Response, next: NextFunction) => {};
export const updateMe = async (req: Request, res: Response, next: NextFunction) => {};
export const deleteMe = async (req: Request, res: Response, next: NextFunction) => {};
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {};
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {};
export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {};
