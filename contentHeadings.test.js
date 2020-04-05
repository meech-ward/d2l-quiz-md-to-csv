const contentHeadings = require('./contentHeadings')

test('should return a single heading', function() {
  expect(contentHeadings({
    text: `## 1
    `,
    headingSyntax: '##'
  })).toStrictEqual(['1'])
  expect(contentHeadings({
    text: `## 2
    `,
    headingSyntax: '##'
  })).toStrictEqual(['2'])
})

test('should return multiple headings', function() {
  expect(contentHeadings({
    text: `## 1
## 2`,
    headingSyntax: '##'
  })).toStrictEqual(['1', '2'])
  expect(contentHeadings({
    text: `## 2

## 1
    `,
    headingSyntax: '##'
  })).toStrictEqual(['2', '1'])
})

test('should not return different', function() {
  expect(contentHeadings({
    text: `## 1
### 2`,
    headingSyntax: '##'
  })).toStrictEqual(['1'])
  expect(contentHeadings({
    text: `### 2

## 1
    `,
    headingSyntax: '##'
  })).toStrictEqual(['1'])
})


test('should return a single heading without extra whitespace', function() {
  expect(contentHeadings({
    text: `##   1
    `,
    headingSyntax: '##'
  })).toStrictEqual(['1'])
  expect(contentHeadings({
    text: `## 2
    `,
    headingSyntax: '##'
  })).toStrictEqual(['2'])
})


test('should return a single heading without any extra content', function() {
  expect(contentHeadings({
    text: `abc
## 1 


    adsb
    `,
    headingSyntax: '##'
  })).toStrictEqual(['1'])
})
