const ShipmentSnapshot: Superluminal.Model = {
  name: 'shipment',
  schema: 'superluminal',
  columns: {
    slug: {
      name: 'slug',
      dataType: 'uuid',
      type: 'string',
      nullable: false,
      autoIncrement: false,
      array: false,
      primary: true,
    },
    from: {
      name: 'from',
      dataType: 'uuid',
      type: 'string',
      nullable: false,
      autoIncrement: false,
      array: false,
    },
    to: {
      name: 'to',
      dataType: 'uuid',
      type: 'string',
      nullable: false,
      autoIncrement: false,
      array: false,
    },
    created_at: {
      name: 'created_at',
      dataType: 'timestamp with time zone',
      type: 'Date',
      nullable: true,
      autoIncrement: false,
      array: false,
    },
    updated_at: {
      name: 'updated_at',
      dataType: 'timestamp with time zone',
      type: 'Date',
      nullable: true,
      autoIncrement: false,
      array: false,
    },
    createdAt: {
      name: 'createdAt',
      dataType: 'timestamp with time zone',
      type: 'Date',
      nullable: false,
      autoIncrement: false,
      array: false,
    },
    updatedAt: {
      name: 'updatedAt',
      dataType: 'timestamp with time zone',
      type: 'Date',
      nullable: false,
      autoIncrement: false,
      array: false,
    },
  },
  primaryKeys: ['slug'],
  indexes: {
    shipment_pkey: {
      unique: true,
      columns: ['slug'],
    },
    shipment_from_user_slug_fk: {
      unique: false,
      columns: ['"from"'],
    },
    shipment_to_user_slug_fk: {
      unique: false,
      columns: ['"to"'],
    },
  },
  manyToOnes: {
    user: {
      inverse: 'shipment',
      joinColumns: [
        {
          fieldName: 'user',
          name: 'to',
          referencedColumnName: 'slug',
        },
      ],
      onDelete: 'NO ACTION',
    },
  },
};
