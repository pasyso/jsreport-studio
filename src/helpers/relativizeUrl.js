export default (url) => {
  // someAppPath/studio/templates/NkyDH-8gW
  const path = window.location.pathname

  // /studio/templates/NkyDH-8gW
  const jsreportPath = path.substring(path.indexOf('/studio'))

  // ../../
  const relativePath = jsreportPath.split('/').map(() => '../').join('')

  // ../../odata/templates
  return relativePath + url.indexOf('/') === 0 ? url.substring(0) : url
}
