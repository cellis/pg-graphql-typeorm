import { DATE, ModelAttributes, NOW, STRING, INTEGER } from 'sequelize';

const DocumentTable: ModelAttributes = {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  url: {
    type: STRING,
  },

  created_at: {
    type: DATE,
    defaultValue: NOW,
  },

  updated_at: {
    type: DATE,
    defaultValue: NOW,
  },
};
export default DocumentTable;
