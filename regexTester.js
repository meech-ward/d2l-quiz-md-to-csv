const chalk = require('chalk')

module.exports = function({regexString, testString}) {
  const regex = RegExp(regexString)
  const passed = regex.test(testString)

  const chalkFunc = passed ? chalk.green : chalk.white.bgRed.bold
  console.log(chalkFunc(`Regex test ${passed ? "PASSED!" : "FAILED! 😡"}
  regex: ${regexString}
  test: ${testString}`))

  console.log('\n')

  return passed
}