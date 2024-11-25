import { Request, Response } from 'express';

export const getHealthHandler = (_: Request, res: Response) => {
  res.status(200).send('OK');
};
