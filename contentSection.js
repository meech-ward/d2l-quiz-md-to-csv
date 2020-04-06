module.exports = function({text, sectionStart, sectionEnd}) {
  let startIndex = sectionStart ? text.search(sectionStart) : 0
  startIndex = startIndex === -1 ? 0 : startIndex

  text = text.substring(startIndex).replace(sectionStart, '').trim()

  let length = sectionEnd ? text.search(sectionEnd) : undefined
  length = length === -1 ? undefined : length

  return {text: text.substring(0, length).trim(), startIndex, length}
}