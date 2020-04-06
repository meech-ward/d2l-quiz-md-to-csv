module.exports = function({text, sectionStart, sectionEnd, strict}) {
  let startIndex = sectionStart ? text.search(sectionStart) : 0
  if (strict && startIndex === -1) {
    return {text: '', startIndex: 0, length: 0}
  }
  startIndex = startIndex === -1 ? 0 : startIndex

  text = text.substring(startIndex).replace(sectionStart, '')

  let length = sectionEnd ? text.search(sectionEnd) : text.length
  if (strict && length === -1) {
    return {text: '', startIndex: 0, length: 0}
  }
  length = length === -1 ? text.length : length

  return {text: text.substring(0, length), startIndex, length}
}