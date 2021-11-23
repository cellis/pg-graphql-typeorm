"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeManyToOne = exports.serializeOneToMany = exports.serializeOneToManybyAssoc = exports.serializeOneToOne = void 0;
const lodash_1 = require("lodash");
const pluralize_1 = __importDefault(require("pluralize"));
const normalizeIdColumn_1 = __importDefault(require("../associations/normalizeIdColumn"));
const resolveColumnName_1 = __importDefault(require("../associations/resolveColumnName"));
const serializeManyToOneByAssoc_1 = require("./serializeManyToOneByAssoc");
const utils_1 = require("./utils");
const serializeOneToOne = (associatedModelName, oneToOne, columns, associationMapping) => {
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
const serializeOneToManybyAssoc = (model, association, models) => {
    const body = [];
    if (association) {
        const associatedModelNames = Object.keys(association).sort();
        associatedModelNames.forEach((name) => {
            const columns = association[name];
            const ClassName = utils_1.PascalCase(name);
            if (columns) {
                columns.forEach((col) => {
                    const src = col[0];
                    const dest = col[1];
                    const destModel = models[name];
                    const byMultiple = columns.length > 1;
                    const variableName = `${pluralize_1.default(lodash_1.camelCase(name))}${byMultiple ? `By${utils_1.PascalCase(src)}` : ''}`;
                    const srcName = byMultiple
                        ? src
                        : resolveColumnName_1.default(destModel, model.name);
                    let funcVar = `${lodash_1.camelCase(name)}.${lodash_1.camelCase(normalizeIdColumn_1.default(srcName))}`;
                    if (byMultiple) {
                        funcVar += `By${utils_1.PascalCase(col[1])}`;
                    }
                    const funcs = `() => ${ClassName}, (${lodash_1.camelCase(name)}) => ${funcVar}`;
                    const variable = `${variableName}: ${ClassName}[];`;
                    body.push([`  @OneToMany(${funcs})`, `  ${variable}`]);
                });
            }
        });
    }
    return body.map((variables) => variables.join('\n')).join('\n\n');
};
exports.serializeOneToManybyAssoc = serializeOneToManybyAssoc;
const serializeOneToMany = (associatedModelName, oneToMany, associationMapping) => {
    const association = associationMapping.oneToManys[associatedModelName];
    if (association) {
        const body = [];
        const associatedModelNames = Object.keys(association).sort();
        associatedModelNames.forEach((name) => {
            const columns = association[name];
            if (columns) {
                columns.forEach((col) => {
                    const src = col[0];
                    const ClassName = utils_1.PascalCase(name);
                    const variableName = `${pluralize_1.default(name)}By${utils_1.PascalCase(src)}`;
                    const funcs = `() => ${ClassName}, (${name}) => ${name}.${src}`;
                    const variable = `${variableName}: ${ClassName}[];`;
                    body.push([`  @OneToMany(${funcs})`, `  ${variable}`]);
                });
            }
        });
        return body.map((variables) => variables.join('\n')).join('\n');
    }
    else {
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
    }
};
exports.serializeOneToMany = serializeOneToMany;
const serializeManyToOne = (associatedModelName, manyToOne, model, associationMapping) => {
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
    const resolvedColumnName = resolveColumnName_1.default(model, model.name);
    // prettier-ignore
    return [
        `${body.join('\n')}`,
        `  ${resolvedColumnName}: ${Name};`,
    ].join('\n');
};
exports.serializeManyToOne = serializeManyToOne;
exports.default = (model, models, associationMapping) => {
    const result = [];
    if (model.oneToOnes) {
        for (const [associatedName, oneToOne] of Object.entries(model.oneToOnes)) {
            const target = models[associatedName];
            result.push(exports.serializeOneToOne(associatedName, oneToOne, target.columns, associationMapping));
        }
    }
    const oneToManys = associationMapping.oneToManys[model.name];
    if (oneToManys) {
        result.push(exports.serializeOneToManybyAssoc(model, oneToManys, models));
    }
    const manyToOnes = associationMapping.manyToOnes[model.name];
    if (manyToOnes) {
        result.push(serializeManyToOneByAssoc_1.serializeManyToOnebyAssoc(model, manyToOnes, models));
    }
    return result.join('\n\n');
};
//# sourceMappingURL=serializeAssociations.js.map