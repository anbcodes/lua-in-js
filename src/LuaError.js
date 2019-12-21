import * as LuaErrorTypes from './LuaErrorTypes.js'

export default class LuaError extends Error {
  constructor(type, message) {
    super(message)
    this.type = type
    this.name = this.createName()
  }

  createName() {
    switch (this.type) {
      case LuaErrorTypes.SYNTAX_ERROR:
        return 'Lua Syntax Error'
      case LuaErrorTypes.MEMORY_ERROR:
        return 'Lua Memory Error'
      case LuaErrorTypes.RUNTIME_ERROR:
        return 'Lua Runtime Error'
      case LuaErrorTypes.GARBAGE_ERROR:
        return 'Lua Garbage Collector Error'
      default:
        return 'Lua Error'
    }
  }
}