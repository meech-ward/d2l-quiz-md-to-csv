const fs = require('fs')
const path = require('path')

const questionParser = require('./questionParser')

const text = fs.readFileSync(path.join(__dirname, 'testQuestion.md')).toString()

const result = questionParser({text})

test('should parse all of the sections', function() {
  expect(Object.keys(result)).toStrictEqual(['Question Title', 'Hint', 'Feedback', 'Answers'])
})

test('should parse the answers scores', function() {
  expect(Object.keys(result.Answers.answerSections).sort()).toStrictEqual(['100', '50'].sort())
})

test('should parse the answers regex', function() {
  expect(result.Answers.answerSections[100].regex.text).toStrictEqual("[\\s\\S]*console.log[\\s\\S]*")
  expect(result.Answers.answerSections[50].regex.text).toStrictEqual("[\\s\\S]*console[\\s\\S]*")
})

test('should parse the answers tests', function() {
  expect(result.Answers.answerSections[100].tests[0].text).toStrictEqual("test 1a")
  expect(result.Answers.answerSections[100].tests[1].text).toStrictEqual("test 2a")
  expect(result.Answers.answerSections[100].tests[2].text).toStrictEqual("test 3a")
  expect(result.Answers.answerSections[100].tests[3].text).toStrictEqual("test \n4a \nmulti \nline")
  expect(result.Answers.answerSections[100].tests[4].text).toStrictEqual("\ntest \n5a \n\nmulti \nline\n")
  expect(result.Answers.answerSections[100].tests[5]).toBe(undefined)
  expect(result.Answers.answerSections[50].tests[0].text).toStrictEqual("test 1b")
})