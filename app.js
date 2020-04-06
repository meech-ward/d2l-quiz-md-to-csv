const { fm, md } = require('./markdown')

const fs = require('fs')
const path = require('path')

const questionParser = require('./questionParser')
const regexTester = require('./regexTester')

const markdownSections = ["Feedback", "Hint"]
const defaultSections = ["Answers", ...markdownSections]

const pathToFiles = process.argv[2]
const lstat = fs.lstatSync(pathToFiles)
const files = !lstat.isDirectory() ? [pathToFiles] : fs.readdirSync(pathToFiles).map(file => path.join(pathToFiles, file))

files.forEach(file => {
  const text = fs.readFileSync(file).toString()

  const questionSections = questionParser({text})

  // Run tests if true is passed in as the second argument
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
QuestionText,"${md(questionSections[title].text)}",HTML
Points,${questionAttributes.Points}
Difficulty,${questionAttributes.Difficulty}
InputBox,${questionAttributes.InputBox[0]},${questionAttributes.InputBox[1]},
Hint,"${md(questionSections['Hint'].text)}",HTML,
Feedback,"${md(questionSections['Feedback'].text)}",HTML,
  `

  Object.keys(questionSections.Answers.answerSections).forEach(key => {
    const answer = questionSections.Answers.answerSections[key]
    csv +=
`Answer,${key},"${answer.regex.text}",regexp
`
  })


  console.log(csv)
})
