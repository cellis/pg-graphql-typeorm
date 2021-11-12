import { DATE, NOW, Sequelize, STRING, UUID } from 'sequelize';

export default {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
  },
  response_to: {
    type: UUID,
    references: {
      key: 'id',
      model: 'message',
    },
  },
  content: {
    type: STRING,
  },
  created_at: {
    type: DATE,
    defaultValue: Sequelize.fn('now'),
  },
  updated_at: {
    type: DATE,
    defaultValue: NOW,
  },
};
