const contentSection = require('./contentSection')
const contentHeadings = require('./contentHeadings')

const headingRegex = ({heading, headingSyntax}) => new RegExp(`${headingSyntax}\\s*${heading}`, 'i')

module.exports = function({text, headingSyntax}) {
  const headings = contentHeadings({text, headingSyntax})
  const sections = headings.map(function(heading, index) {
    const sectionEnd = headings[index+1] ? headingRegex({headingSyntax, heading: headings[index+1]}) : undefined
    return contentSection({
      text, 
      sectionStart: headingRegex({headingSyntax, heading}),
      sectionEnd
    })
  })
  

  const sectionsWithHeadings = {}

  for (let i = 0; i < headings.length; i++) {
    sectionsWithHeadings[headings[i]] = sections[i]
  }

  return sectionsWithHeadings
}