import { DATE, ModelAttributes, NOW, STRING, UUID } from 'sequelize';

const PhotoTable: ModelAttributes = {
  slug: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    allowNull: false,
    primaryKey: false,
    references: {
      key: 'slug',
      model: 'user',
    },
    type: UUID,
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
export default PhotoTable;
