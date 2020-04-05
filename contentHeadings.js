module.exports = function({text, headingSyntax}) {
  const regex = new RegExp(`(^|[\n\r])${headingSyntax}\\s+(.*)`, 'ig')
  // console.log('regex',regex)
  const matches = [...text.match(regex)].map(str => str.replace(regex, '$2').trim())
  return matches
}