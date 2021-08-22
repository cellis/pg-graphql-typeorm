const UserSnapshot: Superluminal.Model = {
  name: 'user',
  schema: 'superluminal',
  columns: {
    slug: {
      name: 'slug',
      dataType: 'uuid',
      type: 'string',
      nullable: false,
      autoIncrement: false,
    },
    first_name: {
      name: 'first_name',
      dataType: 'character varying',
      type: 'string',
      nullable: true,
      autoIncrement: false,
    },
    last_name: {
      name: 'last_name',
      dataType: 'character varying',
      type: 'string',
      nullable: true,
      autoIncrement: false,
    },
    credits: {
      name: 'credits',
      dataType: 'integer',
      type: 'number',
      nullable: true,
      default: '0',
      autoIncrement: false,
    },
    hobbies: {
      name: 'hobbies',
      dataType: 'text',
      type: 'string[]',
      nullable: true,
      autoIncrement: false,
    },
    created_at: {
      name: 'created_at',
      dataType: 'timestamp with time zone',
      type: 'Date',
      nullable: true,
      default: 'now()',
      autoIncrement: false,
    },
    rating: {
      name: 'rating',
      dataType: 'numeric',
      type: 'string',
      nullable: true,
      default: '0.88',
      autoIncrement: false,
    },
    full_text: {
      name: 'full_text',
      dataType: 'character varying',
      type: 'string',
      nullable: true,
      autoIncrement: false,
    },
    updated_at: {
      name: 'updated_at',
      dataType: 'timestamp with time zone',
      type: 'Date',
      nullable: true,
      autoIncrement: false,
    },
  },
  primaryKeys: ['slug'],
  indexes: {
    user_pkey: {
      unique: true,
      columns: ['slug'],
    },
    user_full_text_idx: {
      unique: false,
      columns: ['full_text'],
    },
  },
};

export default UserSnapshot;
