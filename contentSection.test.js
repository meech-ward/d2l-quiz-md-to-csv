const contentSection = require('./contentSection')

test('should return content between two points', function() {
  expect(contentSection({
    text: `#1a#2`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toBe('a')
  expect(contentSection({
    text: `#1b#2`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toBe('b')
})

test('should return content between two points when extra content comes before and after', function() {
  expect(contentSection({
    text: `abc#1a#2`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toBe('a')
  expect(contentSection({
    text: `#1b#2cba`,
    sectionStart: /#1/,
    sectionEnd: /#2/
  })).toBe('b')
})

test('should return content between two points when there is no section end', function() {
  expect(contentSection({
    text: `#1a`,
    sectionStart: /#1/,
  })).toBe('a')
  expect(contentSection({
    text: `#1ab`,
    sectionStart: /#1/,
  })).toBe('ab')
})
test('should return content between two points when there is no section start', function() {
  expect(contentSection({
    text: `a#1`,
    sectionEnd: /#1/,
  })).toBe('a')
  expect(contentSection({
    text: `ab#1`,
    sectionEnd: /#1/,
  })).toBe('ab')
})