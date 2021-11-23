function normalizeIdColumn(src: string) {
  let newSrc = src;
  if (src.endsWith('_id') || src.endsWith('_slug')) {
    newSrc = src.split('_').slice(0, -1).join('_');
  }
  return newSrc;
}

export default normalizeIdColumn;
