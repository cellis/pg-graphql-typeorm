import { DataTypes } from 'sequelize';
declare const _default: {
    slug: {
        allowNull: boolean;
        primaryKey: boolean;
        type: DataTypes.AbstractDataTypeConstructor;
    };
    first_name: {
        type: DataTypes.StringDataTypeConstructor;
    };
    last_name: {
        type: DataTypes.StringDataTypeConstructor;
    };
    credits: {
        type: DataTypes.IntegerDataTypeConstructor;
        defaultValue: number;
    };
    hobbies: {
        type: DataTypes.ArrayDataType<DataTypes.TextDataTypeConstructor>;
    };
    created_at: {
        type: DataTypes.DateDataTypeConstructor;
        defaultValue: import("sequelize/types/lib/utils").Fn;
    };
    connected: {
        type: DataTypes.AbstractDataTypeConstructor;
        default: boolean;
    };
    rating: {
        type: DataTypes.DecimalDataTypeConstructor;
        defaultValue: number;
    };
    full_text: {
        type: DataTypes.StringDataTypeConstructor;
    };
    updated_at: {
        type: DataTypes.DateDataTypeConstructor;
        defaultValue: DataTypes.AbstractDataTypeConstructor;
    };
};
export default _default;
