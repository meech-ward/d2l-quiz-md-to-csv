const fm = require('front-matter')
const marked = require('marked')


marked.setOptions({
  highlight: function(code, ) {
    return code.replace(/[\n\r]/g, '<br>')
  }
})

const md = text => marked(text).replace(/(<pre>|<\/pre>|[\n\r]|<h2[\s\S]*h2>)/g, '').trim()

module.exports = { fm, md }