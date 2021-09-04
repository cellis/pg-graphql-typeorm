"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (name, indexes, schema, PascalName, columns, associations, options) => {
    // prettier-ignore
    const result = [
        `${indexes}`,
        `@Entity('${name}', { schema: '${schema}' })`,
        (options === null || options === void 0 ? void 0 : options.graphql) ? '@ObjectType()' : '',
        `export class ${PascalName} extends BaseEntity {`,
        `${columns}${associations ? '\n' : ''}`,
        `${associations}`,
        '}',
    ].filter(s => s.trim().length).join('\n');
    return result;
};
//# sourceMappingURL=serializeBody.js.map