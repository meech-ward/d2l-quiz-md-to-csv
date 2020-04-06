module.exports = function({text, sectionStart, sectionEnd}) {
  let startIndex = sectionStart ? text.search(sectionStart) : 0
  startIndex = startIndex === -1 ? 0 : startIndex

  text = text.substring(startIndex).replace(sectionStart, '').trim()

  let length = sectionEnd ? text.search(sectionEnd) : text.length
  length = length === -1 ? text.length : length

  return {text: text.substring(0, length).trim(), startIndex, length}
}