const prompt = require('prompt-sync')()
class Reg {
  constructor(value) {
    this.value = value
  }

  get getValue() {
    return this.value
  }
  add() {
    this.value++
  }
  sub() {
    this.value--
  }
  equalZero() {
    return this.value === 0
  }
}

let regMap = {}

let inserir = prompt('Deseja inserir registrador? S|N ')
while (inserir != 'N') {
  let regValue = prompt('Insira Registrador/Valor? Reg/Val ')
  let registrador = regValue.split('/')
  regMap[registrador[0]] = new Reg(registrador[1])

  inserir = prompt('Deseja inserir registrador? S|N ')
}

console.log(regMap)