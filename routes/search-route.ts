import express from 'express';
import { translationSearch } from '../controllers/search-controller';
const router = express.Router();

router.get('/', translationSearch);

export default router;
