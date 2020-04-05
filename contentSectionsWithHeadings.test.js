const contentSectionsWithHeadings = require('./contentSectionsWithHeadings')

test('should return content and heading for one section', function() {
  expect(contentSectionsWithHeadings({
    text: `## 1
    a
    `,
    headingSyntax: '##'
  })).toStrictEqual({'1': {text: 'a'}})
  expect(contentSectionsWithHeadings({
    text: `## 2
    b
    `,
    headingSyntax: '##'
  })).toStrictEqual({'2': {text: 'b'}})
})

test('should return content and heading for multiple section', function() {
  expect(contentSectionsWithHeadings({
    text: `## 1
    a
## 2
    b

##   3

    cccc
    `,
    headingSyntax: '##'
  })).toStrictEqual({
    '1': {text: 'a'},
    '2': {text: 'b'},
    '3': {text: 'cccc'}
  })
})