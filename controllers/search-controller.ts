import { NextFunction, Request, Response } from 'express';
import { promisify } from 'util';
import zlib from 'zlib';
import { getSearchTranslations, getWordsForEveryTranslation } from '../services/search-services';

interface TranslationRow {
  id: number;
  sura_id: number;
  ayah_id: number;
  [key: string]: string | number | null;
}

export const translationSearch = async (req: Request, res: Response, next: NextFunction) => {
  const { text = '' } = req.query as { text: string };
  const gzip = promisify(zlib.gzip);

  try {
    const { count, rows, page, pageSize, translationColumns } = await getSearchTranslations(req);
    const allWords = await getWordsForEveryTranslation(rows);

    const combinedTranslations = rows.reduce((prev, translation: TranslationRow) => {
      const { id, ayah_id, sura_id } = translation;
      const filteredWords = allWords.filter((word: any) => word.sura === sura_id && word.ayah === ayah_id);

      prev.push({
        id,
        sura_id,
        ayah_id,
        words: filteredWords,
        translations: translationColumns.map(item => {
          return { name: item, content: translation[item] };
        }),
      });

      return prev;
    }, []);

    const data = {
      translations: combinedTranslations,
      totalResults: count,
      page,
      pageSize,
      searchText: text,
    };
    const jsonString = JSON.stringify(data);
    const compressedData = await gzip(jsonString, { level: 9 });

    res.status(200).json(compressedData);
  } catch (err) {
    next(err);
  }
};
