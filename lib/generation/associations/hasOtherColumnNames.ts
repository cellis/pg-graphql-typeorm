function hasOtherColumnNames(model: Superluminal.Model, name: string) {
  const has = model.columns[name] || (model.oneToOnes && model.oneToOnes[name]);

  return has;
}

export default hasOtherColumnNames;
