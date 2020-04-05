module.exports = function({text, sectionStart, sectionEnd}) {
  let startIndex = sectionStart ? text.search(sectionStart) : 0
  startIndex = startIndex === -1 ? 0 : startIndex

  let endIndex = sectionEnd ? text.search(sectionEnd) : undefined
  endIndex = endIndex === -1 ? undefined : endIndex

  return text.substring(startIndex, endIndex).replace(sectionStart, '').trim()
}