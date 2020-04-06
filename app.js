const marked = require('marked')
const fs = require('fs')
const fm = require('front-matter')

marked.setOptions({
  highlight: function(code, lang, callback) {
    // console.log(code, lang, callback)
    return code.replace(/[\n\r]/g, '<br>')
  }
})

const markdown = text => marked(text).replace(/(<pre>|<\/pre>|[\n\r]|<h2[\s\S]*h2>)/g, '').trim()


const questionParser = require('./questionParser')
const regexTester = require('./regexTester')

const markdownSections = ["Feedback", "Hint"]
const defaultSections = ["Answers", ...markdownSections]

const text = fs.readFileSync(process.argv[2]).toString()

const questionSections = questionParser({text})

if (process.argv[3]) {
  const tests = []
  Object.keys(questionSections.Answers.answerSections).forEach(key => {
    const answer = questionSections.Answers.answerSections[key]
    answer.tests.forEach(test => {
      tests.push({regexString: answer.regex.text, testString: test.text})
    })
  })
  regexTester(tests)
  return
}


const title = Object.keys(questionSections).filter(heading => !defaultSections.includes(heading))[0]

const content = fm(text.trim()) 
const questionAttributes = content.attributes

let csv = `
NewQuestion,SA
ID,${questionAttributes.ID}
Title,${title}
QuestionText,"${markdown(questionSections[title].text)}",HTML
Points,${questionAttributes.Points}
Difficulty,${questionAttributes.Difficulty}
InputBox,${questionAttributes.InputBox[0]},${questionAttributes.InputBox[1]},
Hint,"${markdown(questionSections['Hint'].text)}",HTML,
Feedback,"${markdown(questionSections['Feedback'].text)}",HTML,
`

Object.keys(questionSections.Answers.answerSections).forEach(key => {
  const answer = questionSections.Answers.answerSections[key]
  csv +=
`Answer,${key},"${answer.regex.text}",regexp
`
})



console.log(csv)
