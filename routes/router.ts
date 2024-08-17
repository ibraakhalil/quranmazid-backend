import { NextFunction, Request, Response, Router } from 'express';
import searchRoute from './search-route';
import testRoute from './test-route';
const router = Router();

router.use('/search', searchRoute);
router.use('/test', testRoute);

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Home Page' });
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const customError = {
    Message: err.message,
    Stack: err.stack?.substring(0, 300) + '...',
  };
  console.error(customError);
  res.status(500).json({
    error: 'Internal Server Error',
  });
});

export default router;
