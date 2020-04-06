const contentSection = require('./contentSection')

test('should return content between two points', function() {
  expect(contentSection({
    text: `#1a#2`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toStrictEqual({text: 'a', startIndex:0, length: 1})
  expect(contentSection({
    text: `#1b#2`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toStrictEqual({text: 'b', startIndex:0, length: 1})
})

test('should return content between two points that could match', function() {
  expect(contentSection({
    text: `#11a#1`,
    sectionStart: /#11/,
    sectionEnd: /#1/
  })).toStrictEqual({text: 'a', startIndex: 0, length: 1})
})


test('should return content between two points when extra content comes before and after', function() {
  expect(contentSection({
    text: `abc#1a#2`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toStrictEqual({text: 'a', startIndex: 3, length: 1})
  expect(contentSection({
    text: `#1b#2cba`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toStrictEqual({text: 'b', startIndex: 0, length: 1})
})

test('should return content between two points when there is no section end', function() {
  expect(contentSection({
    text: `#1a`,
    sectionStart: /#1/,
  })).toStrictEqual({text: 'a', startIndex: 0, length: 1})
  expect(contentSection({
    text: `#1ab`,
    sectionStart: /#1/,
  })).toStrictEqual({text: 'ab', startIndex: 0, length: 2})
})
test('should return content between two points when there is no section start', function() {
  expect(contentSection({
    text: `a#1`,
    sectionEnd: /#1/,
  })).toStrictEqual({text: 'a', startIndex: 0, length: 1})
  expect(contentSection({
    text: `ab#1`,
    sectionEnd: /#1/,
  })).toStrictEqual({text: 'ab', startIndex: 0, length: 2})
})