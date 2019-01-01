function removePrefix(name) {
  let p = name.indexOf('!');
  return p > -1 ? [name.substring(0, p), name.substring(p+1)] : [null, name];
}

module.exports = function (entityName1) {
  const [prefix, entityName] = removePrefix(entityName1);
  if (entityName.indexOf('.') !== -1) {
    return entityName.slice(0, entityName.indexOf('.')) + '(clone)' + entityName.slice(entityName.indexOf('.'))
  } else {
    return entityName + '(clone)'
  }
}
