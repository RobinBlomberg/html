const NodeTypes = require('./nodeTypes')
const SvgTags = require('./svgTags')
const Tags = require('./tags')
const compile = require('./compile')

const tagNames = [...new Set([...Tags, ...SvgTags])]

const _createCdataSection = (data = '') => {
  return {
    data,
    nodeType: NodeTypes.CDATA_SECTION_NODE
  }
}

const _createComment = (data = '') => {
  return {
    data,
    nodeType: NodeTypes.COMMENT_NODE
  }
}

const _createDocument = (childNodes = []) => {
  return {
    childNodes,
    nodeType: NodeTypes.DOCUMENT_NODE
  }
}

const _createDocumentType = (name = 'html', publicId = '', systemId = '') => {
  return {
    name,
    nodeType: NodeTypes.DOCUMENT_TYPE_NODE,
    publicId,
    systemId
  }
}

const _createElement = (tagName = 'div', attributes = {}, childNodes = []) => {
  return {
    attributes,
    childNodes,
    nodeType: NodeTypes.ELEMENT_NODE,
    tagName
  }
}

const _createProcessingInstruction = (target = '', data = '') => {
  return {
    data,
    nodeType: NodeTypes.PROCESSING_INSTRUCTION_NODE,
    target
  }
}

const _createText = (data = '') => {
  return {
    data,
    nodeType: NodeTypes.TEXT_NODE
  }
}

module.exports = () => {
  const registry = (tagName = 'div', attributes = {}, childNodes = []) => {
    return registry.createElement(tagName, attributes, childNodes)
  }

  registry.compile = compile
  registry.createCdataSection = _createCdataSection
  registry.createComment = _createComment
  registry.createDocument = _createDocument
  registry.createDocumentType = _createDocumentType
  registry.createElement = _createElement
  registry.createProcessingInstruction = _createProcessingInstruction
  registry.createText = _createText

  for (const tagName of tagNames) {
    registry[tagName] = (attributes = {}, childNodes = []) => {
      return registry.createElement(tagName, attributes, childNodes)
    }
  }

  return registry
}
