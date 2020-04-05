module.exports = function({text, sectionStart, sectionEnd}) {
  let startIndex = sectionStart ? text.search(sectionStart) : 0
  startIndex = startIndex === -1 ? 0 : startIndex

  text = text.substring(startIndex).replace(sectionStart, '').trim()

  let endIndex = sectionEnd ? text.search(sectionEnd) : undefined
  endIndex = endIndex === -1 ? undefined : endIndex

  return text.substring(0, endIndex).trim()
}