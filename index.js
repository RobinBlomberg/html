const NodeTypes = require('./nodeTypes')
const SvgTags = require('./svgTags')
const Tags = require('./tags')
const VoidTags = require('./voidTags')
const compile = require('./compile')
const createRegistry = require('./createRegistry')

module.exports = {
  NodeTypes,
  SvgTags,
  Tags,
  VoidTags,
  compile,
  createRegistry
}
