import { PascalCase } from './utils';

export default (models: Superluminal.Models) => {
  return Object.keys(models)
    .sort()
    .map((modelName) => {
      const Name = PascalCase(modelName);
      return `export { ${Name} } from './${Name}';`;
    })
    .join('\n');
};
