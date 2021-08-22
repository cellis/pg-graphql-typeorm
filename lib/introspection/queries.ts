export const IndexesQuery2 = `
  SELECT ns.nspname AS schema_name, 
  idx.indrelid::REGCLASS AS table_name, 
  i.relname AS index_name, 
  idx.indisunique AS is_unique, 
  idx.indisprimary AS is_primary, 
  am.amname AS method, 
  ARRAY( SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE)
    FROM generate_subscripts(idx.indkey, 1) AS k ORDER BY k ) 
    AS index_keys 
  FROM pg_index AS idx 
  JOIN pg_class AS i ON i.oid = idx.indexrelid 
  JOIN pg_am AS am ON i.relam = am.oid 
  JOIN pg_namespace AS NS ON i.relnamespace = NS.OID 
  JOIN pg_user AS U ON i.relowner = U.usesysid 
    WHERE ns.nspname in ($1)`;

export const multipleSchemasIndexesQuery = (schemas: string[]) => {
  return IndexesQuery2.replace(
    '($1)',
    `(${schemas.map((s) => `'${s}'`).join(',')})`
  );
};
