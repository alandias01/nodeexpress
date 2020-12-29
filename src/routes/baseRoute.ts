import { Router } from 'express';
import wordRouter from './wordRoute';

const baseRouter = Router();
baseRouter.use('/words', wordRouter);

export default baseRouter;
