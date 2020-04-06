const chalk = require('chalk')

function testRegex({regexString, testString}) {
  const regex = RegExp(regexString)
  const passed = regex.test(testString)

  const chalkFunc = passed ? chalk.green : chalk.white.bgRed.bold
  console.log(chalkFunc(`Regex test ${passed ? "PASSED!" : "FAILED! 😡"}
  regex: ${regexString}
  test: ${testString}`))

  console.log('\n')

  return passed
}

module.exports = function(tests) {
  let failed = 0

  tests.forEach(test => {
    if (!testRegex(test)) {
      failed++
    }
  })

  if (failed > 0) {
    throw `${failed} test failed`
  }

  console.log(chalk.white.bgGreen.bold("All Tests Passed 🤗"), '\n')
}