"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeManyToOne = exports.serializeOneToMany = exports.serializeOneToOne = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
const serializeOneToOne = (associatedModelName, oneToOne, columns) => {
    const name = associatedModelName;
    const Name = utils_1.PascalCase(name);
    const columnName = oneToOne.referencedColumn;
    const inverseColumn = columns[columnName];
    const inverse = utils_1.getColumnName(inverseColumn.name, inverseColumn.array);
    const funcs = `() => ${Name}, (${name}) => ${name}.${inverse}`;
    // prettier-ignore
    return [
        `  @OneToOne(${funcs})`,
        `  ${name}: ${Name};`,
    ].join('\n');
};
exports.serializeOneToOne = serializeOneToOne;
const serializeOneToMany = (associatedModelName, oneToMany) => {
    const name = associatedModelName;
    const Name = utils_1.PascalCase(name);
    // we pass false because the inverse is not plural
    const inverse = utils_1.getColumnName(oneToMany.inverse, false);
    const funcs = `() => ${Name}, (${name}) => ${name}.${inverse}`;
    // prettier-ignore
    return [
        `  @OneToMany(${funcs})`,
        `  ${utils_1.getColumnName(name, true)}: ${Name}[];`,
    ].join('\n');
};
exports.serializeOneToMany = serializeOneToMany;
function hasOtherColumnNames(model, name) {
    const has = model.columns[name] || (model.oneToOnes && model.oneToOnes[name]);
    // (model.manyToOnes && model.manyToOnes[name]) ||
    // (model.manyToManys && model.manyToManys[name]);
    return has;
}
const serializeManyToOne = (associatedModelName, manyToOne, model) => {
    const name = associatedModelName;
    const Name = utils_1.PascalCase(name);
    const optionsBody = [];
    if (manyToOne.onDelete) {
        optionsBody.push(`onDelete: '${manyToOne.onDelete}'`);
    }
    const modelName = lodash_1.camelCase(name);
    const inverseFieldName = manyToOne.inverse;
    const oneToManyName = utils_1.getColumnName(inverseFieldName, true);
    const statementBody = [
        `  () => ${Name}`,
        `  ${modelName} => ${modelName}.${oneToManyName}`,
    ];
    if (optionsBody.length) {
        statementBody.push(`  { ${optionsBody.join(', ')} }`);
    }
    // prettier-ignore
    const body = [
        '  @ManyToOne(',
        `  ${statementBody.join(',\n  ')}`,
        '  )',
    ];
    if (manyToOne.joinColumns) {
        const jc = manyToOne.joinColumns[0];
        const refCol = `referencedColumnName: '${lodash_1.camelCase(jc.referencedColumnName)}'`;
        body.push(`  @JoinColumn([{ name: '${jc.name}', ${refCol} }])`);
    }
    let resolvedColumnName = modelName;
    let i = 1;
    if (hasOtherColumnNames(model, resolvedColumnName)) {
        while (hasOtherColumnNames(model, resolvedColumnName) && i < 5) {
            const existingDigits = resolvedColumnName.match(/\d+/);
            resolvedColumnName = `${resolvedColumnName.replace(/\d+/, '')}${existingDigits ? parseInt(existingDigits[0], 10) + 1 : 2}`;
            i++;
        }
    }
    // prettier-ignore
    return [
        `${body.join('\n')}`,
        `  ${resolvedColumnName}: ${Name};`,
    ].join('\n');
};
exports.serializeManyToOne = serializeManyToOne;
exports.default = (model, models) => {
    const result = [];
    if (model.oneToOnes) {
        for (const [associatedName, oneToOne] of Object.entries(model.oneToOnes)) {
            const target = models[associatedName];
            result.push(exports.serializeOneToOne(associatedName, oneToOne, target.columns));
        }
    }
    if (model.oneToManys) {
        for (const [associatedName, oneToMany] of Object.entries(model.oneToManys)) {
            result.push(exports.serializeOneToMany(associatedName, oneToMany));
        }
    }
    if (model.manyToOnes) {
        for (const [associatedName, manyToOne] of Object.entries(model.manyToOnes)) {
            result.push(exports.serializeManyToOne(associatedName, manyToOne, model));
        }
    }
    return result.join('\n\n');
};
//# sourceMappingURL=serializeAssociations.js.map