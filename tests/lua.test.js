import Lua from '../src/Lua.js'
import LuaError from '../src/LuaError.js'
import * as LuaErrorTypes from '../src/LuaErrorTypes.js'
import fengari from 'fengari'

test('luaInstance.run([code]) runs the code and returns the return value or null', () => {
  let lua = new Lua()
  expect(lua.run('return 20')).toBe(20)
})

test('luaInstance.run([code with invaild syntax]) returns a LuaError with the type of syntax error', () => {
  let lua = new Lua()
  let error = lua.run('print(')
  expect(error).toBeInstanceOf(LuaError)
  expect(error.type).toBe(LuaErrorTypes.SYNTAX_ERROR)
})

test('luaInstance.run([code with invaild refrence]) returns a LuaError with the type of runtime error', () => {
  let lua = new Lua()
  let error = lua.run('return nonExistentValue.invaild')
  expect(error).toBeInstanceOf(LuaError)
  expect(error.type).toBe(LuaErrorTypes.RUNTIME_ERROR)
})

test('luaInstance.addGlobals([globals]) adds the map of globals to the lua state', () => {
  let lua = new Lua()
  lua.addGlobals({Count: 20})
  expect(lua.run('return Count')).toBe(20)
})
