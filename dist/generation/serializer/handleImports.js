"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveType_1 = __importDefault(require("../resolveType"));
const utils_1 = require("./utils");
const handleImports = (model, graphql) => {
    // serialized
    const imp0rts = {};
    const typeormImports = ['BaseEntity', 'Column', 'Entity'];
    if (model.manyToOnes) {
        typeormImports.push('ManyToOne', 'JoinColumn');
        for (const manyToOneImport of Object.keys(model.manyToOnes)) {
            imp0rts[manyToOneImport] = {
                isModule: false,
                partial: [utils_1.PascalCase(manyToOneImport)],
            };
        }
    }
    if (model.oneToManys) {
        typeormImports.push('OneToMany');
        for (const oneToManyImport of Object.keys(model.oneToManys)) {
            imp0rts[oneToManyImport] = {
                isModule: false,
                partial: [utils_1.PascalCase(oneToManyImport)],
            };
        }
    }
    if (model.oneToOnes) {
        typeormImports.push('OneToOne');
        for (const oneToOneImport of Object.keys(model.oneToOnes)) {
            imp0rts[oneToOneImport] = {
                isModule: false,
                partial: [utils_1.PascalCase(oneToOneImport)],
            };
        }
    }
    const typeGraphqlImports = ['ObjectType', 'Field'];
    if (model.primaryKeys) {
        model.primaryKeys.forEach((pk) => {
            const column = model.columns[pk];
            if (column.autoIncrement
                && resolveType_1.default(column.dataType) === 'number') {
                // TODO investigate PrimaryGeneratedColumn
                // vs column ({ generated: true, primary: true })
                typeormImports.push('PrimaryGeneratedColumn');
            }
        });
        if (graphql) {
            typeGraphqlImports.push('ID');
        }
    }
    if (model.indexes) {
        typeormImports.push('Index');
    }
    if (graphql) {
        imp0rts['type-graphql'] = {
            isModule: true,
            partial: typeGraphqlImports,
        };
    }
    imp0rts.typeorm = {
        isModule: true,
        partial: typeormImports,
    };
    delete imp0rts[model.name.toLowerCase()];
    return imp0rts;
};
exports.default = handleImports;
//# sourceMappingURL=handleImports.js.map