export default async () => {
  const config: Superluminal.Config = {
    graphqlModels: {
      exclude: {
        user: true,
      },
      excludeSchemas: {
        'superluminal-private': true,
      },
    },
  };

  return config;
};
