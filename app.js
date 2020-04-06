const marked = require('marked')
const fs = require('fs')
const fm = require('front-matter')

const questionParser = require('./questionParser')
const regexTester = require('./regexTester')

const text = fs.readFileSync(process.argv[2]).toString()

const question = questionParser({text})

const tests = []
Object.keys(question.Answers.answerSections).forEach(key => {
  const answer = question.Answers.answerSections[key]
  answer.tests.forEach(test => {
    tests.push({regexString: answer.regex.text, testString: test.text})
  })
})
regexTester(tests)