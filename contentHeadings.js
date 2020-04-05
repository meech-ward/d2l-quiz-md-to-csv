module.exports = function({text, headingSyntax}) {
  const regex = new RegExp(`${headingSyntax}\s*(.*)`, 'ig')
  const matches = [...text.match(regex)].map(str => str.replace(regex, '$1').trim())
  return matches
}