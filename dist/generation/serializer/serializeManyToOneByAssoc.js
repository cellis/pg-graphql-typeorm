"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeManyToOnebyAssoc = void 0;
const lodash_1 = require("lodash");
const pluralize_1 = __importDefault(require("pluralize"));
const normalizeIdColumn_1 = __importDefault(require("../associations/normalizeIdColumn"));
const resolveColumnName_1 = __importDefault(require("../associations/resolveColumnName"));
const utils_1 = require("./utils");
const serializeManyToOnebyAssoc = (model, association, models) => {
    const body = [];
    if (association) {
        const associatedModelNames = Object.keys(association).sort();
        const ClassName = utils_1.PascalCase(model.name);
        associatedModelNames.forEach((name) => {
            const columns = association[name];
            if (columns) {
                columns.forEach((col) => {
                    const src = col.pair[0];
                    const dest = col.pair[1];
                    const destModel = models[name];
                    const DestClassName = utils_1.PascalCase(destModel.name);
                    const byMultiple = columns.length > 1;
                    const oneToManyName = `${pluralize_1.default(lodash_1.camelCase(model.name))}${byMultiple ? `By${utils_1.PascalCase(src)}` : ''}`;
                    const statementBody = [
                        `  () => ${DestClassName}`,
                        `  ${lodash_1.camelCase(destModel.name)} => ${lodash_1.camelCase(destModel.name)}.${oneToManyName}`,
                    ];
                    const optionsBody = [];
                    if (col.onDelete) {
                        optionsBody.push(`onDelete: '${col.onDelete}'`);
                    }
                    if (optionsBody.length) {
                        statementBody.push(`  { ${optionsBody.join(', ')} }`);
                    }
                    const refCol = `referencedColumnName: '${lodash_1.camelCase(dest)}'`;
                    let varName = '';
                    if (byMultiple) {
                        varName += `${lodash_1.camelCase(normalizeIdColumn_1.default(src))}By${utils_1.PascalCase(dest)}`;
                    }
                    else {
                        varName = resolveColumnName_1.default(model, destModel.name);
                    }
                    body.push([
                        '  @ManyToOne(',
                        `  ${statementBody.join(',\n  ')}`,
                        '  )',
                        `  @JoinColumn([{ name: '${src}', ${refCol} }])`,
                        `  ${lodash_1.camelCase(varName)}: ${DestClassName};`,
                    ]);
                });
            }
        });
    }
    return body.map((variables) => variables.join('\n')).join('\n\n');
};
exports.serializeManyToOnebyAssoc = serializeManyToOnebyAssoc;
//# sourceMappingURL=serializeManyToOneByAssoc.js.map