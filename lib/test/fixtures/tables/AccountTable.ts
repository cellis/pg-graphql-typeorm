import { DATE, ModelAttributes, NOW, STRING, UUID } from 'sequelize';

const AccountTable: ModelAttributes = {
  user_slug: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    references: {
      key: 'slug',
      model: 'user',
    },
  },
  email: {
    type: STRING,
  },
  phone: {
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

export default AccountTable;
