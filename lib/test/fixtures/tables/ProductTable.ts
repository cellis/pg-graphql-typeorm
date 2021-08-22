import { DATE, ModelAttributes, NOW, STRING } from 'sequelize';

const ProductTable: ModelAttributes = {
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
export default ProductTable;
