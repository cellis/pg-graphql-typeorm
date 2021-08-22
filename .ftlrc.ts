export default async () => {
  const config = {
    graphqlModels: {
      exclude: {
        user: true,
      },
      excludeSchemas: {
        superluminal_private: true,
      },
    },
  };

  return config;
};
