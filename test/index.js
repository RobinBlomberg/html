const createRegistry = require('../createRegistry')
const { deepEqual, describe, it } = require('test').test

const html = createRegistry()

describe('compile', () => {
  it('should compile correctly', () => {
    deepEqual(
      html.compile(
        html.createDocument([
          html.createComment('Welcome to my website!'),
          html.createProcessingInstruction('php', 'echo "yes";'),
          html.createDocumentType(
            'html',
            '-//W3C//DTD XHTML 1.0 Transitional//EN',
            'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'
          ),
          html.createElement('html', { lang: 'en-US' }, [
            html.createElement('body', {}, [
              html.createElement('button', { disabled: '' }, [
                html.createText('yes')
              ]),
              html.createElement('script', {}, [
                html.createCdataSection('console.log("Hello");')
              ])
            ])
          ])
        ])
      ),
      '<!--Welcome to my website!--><?php echo "yes";?><!DOCTYPE html PUBLIC ' +
    '"-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
    '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html ' +
    'lang="en-US"><body><button disabled>yes</button><script>' +
    '<![CDATA[console.log("Hello");]]></script></body></html>'
    )
  })

  it('should recursively flatten nodes', () => {
    deepEqual(
      html.compile(
        [
          [
            html.createElement('button', {}, [
              [
                html.createText('yes')
              ]
            ])
          ]
        ]
      ),
      '<button>yes</button>'
    )
  })
})
