export declare const IndexesQuery2 = "\n  SELECT ns.nspname AS schema_name, \n  idx.indrelid::REGCLASS AS table_name, \n  i.relname AS index_name, \n  idx.indisunique AS is_unique, \n  idx.indisprimary AS is_primary, \n  am.amname AS method, \n  ARRAY( SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE)\n    FROM generate_subscripts(idx.indkey, 1) AS k ORDER BY k ) \n    AS index_keys \n  FROM pg_index AS idx \n  JOIN pg_class AS i ON i.oid = idx.indexrelid \n  JOIN pg_am AS am ON i.relam = am.oid \n  JOIN pg_namespace AS NS ON i.relnamespace = NS.OID \n  JOIN pg_user AS U ON i.relowner = U.usesysid \n    WHERE ns.nspname in ($1)";
export declare const multipleSchemasIndexesQuery: (schemas: string[]) => string;