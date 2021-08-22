import handleImports, { Import } from './handleImports';
import { PascalCase } from './utils';

const getPartial = (imp: Import, importName: string) => {
  let partial = ' ';
  if (imp.partial) {
    partial = `{ ${imp.partial.sort().join(', ')} }`;
  } else {
    partial = PascalCase(importName);
  }
  return partial;
};

export default (model: Superluminal.Model, options?: Superluminal.Args) => {
  const imp0rts = handleImports(model, options?.graphql);

  const sortedImports = Object.keys(imp0rts).sort();

  const topLevelImports = sortedImports
    .filter((i) => imp0rts[i].isModule)
    .map((importName) => {
      const imp = imp0rts[importName];

      return `import ${getPartial(imp, importName)} from '${importName}';`;
    });

  const associationImports = sortedImports
    .filter((i) => !imp0rts[i].isModule)
    .map((importName) => {
      const imp = imp0rts[importName];

      return `import ${getPartial(imp, importName)} from './${PascalCase(
        importName
      )}';`;
    });

  return `${topLevelImports.concat(associationImports).join('\n')}\n`;
};
