import { DATE, ModelAttributes, NOW, STRING, UUID } from 'sequelize';

const PaymentDetailsTable: ModelAttributes = {
  slug: {
    type: UUID,
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
export default PaymentDetailsTable;
