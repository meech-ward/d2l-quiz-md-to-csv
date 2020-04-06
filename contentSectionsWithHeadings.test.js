const contentSectionsWithHeadings = require('./contentSectionsWithHeadings')

test('should return content and heading for one section', function() {
  expect(contentSectionsWithHeadings({
    text: `## 1
    a
    `,
    headingSyntax: '##'
  })['1'].text.trim()).toStrictEqual('a')
  expect(contentSectionsWithHeadings({
    text: `## 2
    b
    `,
    headingSyntax: '##'
  })['2'].text.trim()).toStrictEqual('b')
})

test('should return content and heading for multiple section', function() {
  const result = contentSectionsWithHeadings({
    text: `## 1
    a
## 2
    b

##   3

    cccc
    `,
    headingSyntax: '##'
  })
  expect(result['1'].text.trim()).toStrictEqual('a')
  expect(result['2'].text.trim()).toStrictEqual('b')
  expect(result['3'].text.trim()).toStrictEqual('cccc')
})