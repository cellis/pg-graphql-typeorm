import {
  ARRAY,
  BOOLEAN,
  DataTypes,
  DATE,
  DECIMAL,
  NOW,
  Sequelize,
  STRING,
  TEXT,
  UUID,
} from 'sequelize';

export default {
  slug: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
  },
  first_name: {
    type: STRING,
  },
  last_name: {
    type: STRING,
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hobbies: {
    type: ARRAY(TEXT),
  },
  created_at: {
    type: DATE,
    defaultValue: Sequelize.fn('now'),
  },
  connected: {
    type: BOOLEAN,
    default: false,
  },
  rating: {
    type: DECIMAL,
    defaultValue: 0.88,
  },
  full_text: {
    type: STRING,
  },

  updated_at: {
    type: DATE,
    defaultValue: NOW,
  },
};
