import Lua from '../src/Lua.js'

let state = new Lua()

state.addGlobals({
  Parent: {
    hello: 'World'
  },
  DB: {
    you: {
      hello: 'World'
    }
  }
})

let result = state.run(`
print(Parent.hello)
print(DB.you)
print("
return "Hello"..Parent.hello
`)

console.log('Lua result:', result)