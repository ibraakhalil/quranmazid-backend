import { Request } from 'express';
import { literal, Model, Op } from 'sequelize';
import { Literal } from 'sequelize/types/utils';
import Translations from '../models/translations-model';
import WBW from '../models/wbw-model';

interface QueryTypes {
  text?: string;
  page?: string;
  translations?: string;
}

interface SearchResults {
  rows: Array<any>;
  count: number;
  pageSize: number;
  page: number | string;
  translationColumns: string[];
}

export async function getSearchTranslations(req: Request): Promise<SearchResults> {
  const { text = '', page = '1', translations = 'en_sahih' } = req.query as QueryTypes;
  const translationColumns = text === '' ? [] : translations.split(',');
  const pageSize = 10;
  const offset = (parseInt(page, 10) - 1) * pageSize;

  const whereConditions = translationColumns.map(column => ({
    [column]: { [Op.like]: `%${text}%` },
  }));

  const attributes = ['id', 'sura_id', 'ayah_id'] as Array<string | [literal: Literal, alias: string]>;

  translationColumns.forEach(column => {
    attributes.push([
      literal(`CASE
        WHEN ${column} LIKE '%${text}%' THEN ${column} ELSE NULL
        END`),
      column,
    ]);
  });

  const { count, rows } = await Translations.findAndCountAll({
    attributes,
    where: {
      [Op.or]: whereConditions,
    },
    limit: pageSize,
    offset: offset,
  });

  return { count, rows, page, pageSize, translationColumns };
}

export async function getWordsForEveryTranslation(translations: any[]): Promise<Model<any, any>[]> {
  const conditions = translations.map((result: any) => ({
    sura: result.sura_id,
    ayah: result.ayah_id,
  }));

  const allWbwForTranslations = await WBW.findAll({
    attributes: ['ayah', 'sura', 'indopak', 'uthmani', 'bn'],
    where: {
      [Op.or]: conditions,
    },
  });

  return allWbwForTranslations;
}
