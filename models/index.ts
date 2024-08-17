import Translations from './translations-model';
import WBW from './wbw-model';

Translations.hasMany(WBW, {
  sourceKey: 'sura_id',
  foreignKey: 'sura',
  as: 'words',
});

WBW.belongsTo(Translations, {
  targetKey: 'sura_id',
  foreignKey: 'sura',
  as: 'translation',
});
