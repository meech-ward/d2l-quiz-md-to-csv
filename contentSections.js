module.exports = function({text, sectionStart, sectionEnd}) {
  const startIndex = sectionStart ? text.search(sectionStart) : 0
  const endIndex = sectionEnd ? text.search(sectionEnd) : undefined

  return text.substring(startIndex, endIndex).replace(sectionStart, '')
}