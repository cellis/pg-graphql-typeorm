module.exports = () => {
  return {
    graphqlModels: {
      exclude: ['user'],
      excludeSchemas: ['superluminal_private'],
    },
  };
};
