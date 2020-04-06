const marked = require('marked')
const fs = require('fs')
const fm = require('front-matter')

const questionParser = require('./questionParser')
const regexTester = require('./regexTester')

const defaultSections = ["Answers", "Feedback", "Hint"]

const text = fs.readFileSync(process.argv[2]).toString()

const questionSections = questionParser({text})

const title = Object.keys(questionSections).filter(heading => !defaultSections.includes(heading))
console.log(title)
const tests = []
Object.keys(questionSections.Answers.answerSections).forEach(key => {
  const answer = questionSections.Answers.answerSections[key]
  answer.tests.forEach(test => {
    tests.push({regexString: answer.regex.text, testString: test.text})
  })
})
regexTester(tests)