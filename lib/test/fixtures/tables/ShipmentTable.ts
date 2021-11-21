import { DATE, ModelAttributes, NOW, UUID } from 'sequelize';

const ShipmentTable: ModelAttributes = {
  slug: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
  },
  from: {
    allowNull: false,
    primaryKey: false,
    references: {
      key: 'slug',
      model: 'user',
    },
    type: UUID,
  },
  to: {
    allowNull: false,
    primaryKey: false,
    references: {
      key: 'slug',
      model: 'user',
    },
    type: UUID,
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
export default ShipmentTable;
