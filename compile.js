const NodeTypes = require('./nodeTypes')
const VoidTags = require('./voidTags')
const { inspect } = require('string')

const _compileNodeList = (nodes) => {
  let html = ''

  for (const childNode of nodes) {
    html += compile(childNode)
  }

  return html
}

const compile = (node) => {
  if (!node) {
    return ''
  } else if (Array.isArray(node)) {
    return _compileNodeList(node)
  }

  switch (node.nodeType) {
    case NodeTypes.CDATA_SECTION_NODE: {
      return `<![CDATA[${node.data}]]>`
    }
    case NodeTypes.COMMENT_NODE: {
      return `<!--${node.data}-->`
    }
    case NodeTypes.DOCUMENT_NODE: {
      return _compileNodeList(node.childNodes)
    }
    case NodeTypes.DOCUMENT_TYPE_NODE: {
      let html = `<!DOCTYPE ${node.name}`

      if (node.publicId) {
        html += ` PUBLIC "${node.publicId}"`
      }

      if (node.systemId) {
        html += ` "${node.systemId}"`
      }

      html += '>'

      return html
    }
    case NodeTypes.ELEMENT_NODE: {
      let html = `<${node.tagName}`

      for (const name in node.attributes) {
        html += ` ${name}`

        if (node.attributes[name] !== '') {
          html += `="${node.attributes[name]}"`
        }
      }

      html += '>'

      if (!VoidTags.has(node.tagName)) {
        for (const childNode of node.childNodes) {
          html += compile(childNode)
        }

        html += `</${node.tagName}>`
      }

      return html
    }
    case NodeTypes.PROCESSING_INSTRUCTION_NODE: {
      return `<?${node.target} ${node.data}?>`
    }
    case NodeTypes.TEXT_NODE: {
      return node.data
    }
    default: {
      throw new Error(`Unexpected node: ${inspect(node)}`)
    }
  }
}

module.exports = compile
