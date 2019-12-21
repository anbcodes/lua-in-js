import fengari from 'fengari'
import fengariJS from 'fengari-interop'
import LuaError from './LuaError.js'

const lua = fengari.lua
const lualib = fengari.lualib
const lauxlib = fengari.lauxlib

export default class Lua {
  constructor() {
    this.state = lauxlib.luaL_newstate()
    this.loadLibrarys()
  }

  loadLibrarys() {
    lualib.luaL_openlibs(this.state);

    lauxlib.luaL_requiref(this.state, fengari.to_luastring("js"), fengariJS.luaopen_js, true)
  }

  run(code, nameOfChunk = '?') {
    let result = lauxlib.luaL_loadbuffer(
      this.state,
      fengari.to_luastring(code),
      code.length,
      fengari.to_luastring(nameOfChunk)
    )
    this.checkResult(result)

    result = lua.lua_pcall(this.state, 0, 1, 0)
    this.checkResult(result)

    return fengariJS.tojs(this.state, lua.lua_gettop(this.state))
  }

  checkResult(result) {
    if (result) {
      throw new LuaError(result, this.getTrace())
    }
  }

  getTrace() {
    lauxlib.luaL_traceback(this.state, this.state, null, 1)
    return fengariJS.tojs(this.state, -2)
  }

  addGlobals(globals) {
    let keys = Object.keys(globals)
    for (let i = 0; i < keys.length; i += 1) {
      this.addGlobal(keys[i], globals[keys[i]])
    }
  }

  addGlobal(name, value) {
    fengariJS.push(this.state, value)
    lua.lua_setglobal(this.state, name)
  }
}