import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

const WBW = sequelize.define(
  'WBW',
  {
    sura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ayah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    word: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uthmani: {
      type: DataTypes.TEXT,
    },
    indopak: {
      type: DataTypes.TEXT,
    },
    bn: {
      type: DataTypes.TEXT,
    },
    de: {
      type: DataTypes.TEXT,
    },
    en: {
      type: DataTypes.TEXT,
    },
    hi: {
      type: DataTypes.TEXT,
    },
    in: {
      type: DataTypes.TEXT,
    },
    inh: {
      type: DataTypes.TEXT,
    },
    ru: {
      type: DataTypes.TEXT,
    },
    ta: {
      type: DataTypes.TEXT,
    },
    tr: {
      type: DataTypes.TEXT,
    },
    ur: {
      type: DataTypes.TEXT,
    },
    audio: {
      type: DataTypes.TEXT,
    },
    page: {
      type: DataTypes.INTEGER,
    },
    para: {
      type: DataTypes.INTEGER,
    },
    hijb: {
      type: DataTypes.INTEGER,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    qcf: {
      type: DataTypes.TEXT,
    },
    code_v2: {
      type: DataTypes.TEXT,
    },
    line_number: {
      type: DataTypes.TEXT,
    },
    page_v2: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'wbw',
    timestamps: false,
  }
);

export default WBW;
