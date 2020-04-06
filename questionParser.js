const contentSectionsWithHeadings = require('./contentSectionsWithHeadings')
const contentSection = require('./contentSection')

module.exports = function({text}) {

  const mainSections = contentSectionsWithHeadings({
    text,
    headingSyntax: '##'
  })

  const answerSections = contentSectionsWithHeadings({
    text: mainSections.Answers.text,
    headingSyntax: '###'
  })
  

  Object.keys(answerSections).forEach(answer => {
    const regex = contentSection({text: answerSections[answer].text, sectionStart: /```regex/ ,sectionEnd: /```/})
    regex.text = regex.text.replace(/[\s\n\r]*/g, '')
    answerSections[answer].regex = regex
  })

  Object.keys(answerSections).forEach(answer => {
    answerSections[answer].tests = []
    let text = answerSections[answer].text
    console.log('test')
    const sectionStart = "```test"
    const sectionEnd = "```"
    while (true) {
      const test = contentSection({text, sectionStart: RegExp(sectionStart) ,sectionEnd: RegExp(sectionEnd)})
      console.log(test)
      if (!test.text) {
        break
      }
      answerSections[answer].tests.push(test)

      text = text.substring(test.startIndex+test.length+sectionStart.length+sectionEnd.length+1)
    }
    
  })

  mainSections.Answers.answerSections = answerSections
  return mainSections
}


// { 'Question Title':
//    { text:
//       'Question text\n\n* valid \n* markdown\n\n```js\nfunction testFunction() {\n\n}\n```',
//      startIndex: 76,
//      length: 76 },
//   Hint: { text: '*Markdown hint*', startIndex: 171, length: 17 },
//   Feedback:
//    { text: '```js\nconsole.log("Feedback")\n```',
//      startIndex: 197,
//      length: 35 },
//   Answers:
//    { text:
//       '### 100\n\n```regex\n[\\s\\S]*\nconsole.log\n[\\s\\S]*\n```\n\n```test\ntest 1a\n```\n\n```test\ntest 2a\n```\n\n```test\ntest 3a\n```\n\n### 50\n\n```regex\n[\\s\\S]*\nconsole\n[\\s\\S]*\n```\n\n```test\ntest 1b\n```',
//      startIndex: 245,
//      length: 179,
//      answerSections: { '50': [Object], '100': [Object] } } }