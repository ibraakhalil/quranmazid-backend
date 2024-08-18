import express from 'express';
import { sequelize } from '../config/db';
import { translationSearch } from '../controllers/search-controller';
import Translation from '../models/translations-model';
const router = express.Router();

router.get('/', translationSearch);

router.get('/test', async (req, res, next) => {
  const results = await Translation.findAll({
    attributes: [
      'ayah_id',
      'sura_id',
      [
        sequelize.literal(`
        CASE
          WHEN en_haleem LIKE '%done%' THEN en_haleem
          ELSE NULL
        END
      `),
        'en_haleem',
      ],
      [
        sequelize.literal(`
        CASE
          WHEN en_sahih LIKE '%done%' THEN en_sahih
          ELSE NULL
        END
      `),
        'en_sahih',
      ],
    ],
    where: sequelize.literal(`
    en_haleem LIKE '%done%' OR en_sahih LIKE '%done%'
  `),
  });

  res.json(results);
});

export default router;
