const prompt = require('prompt-sync')()
const { readFileSync, promises: fsPromises } = require('fs')
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
  regMap[registrador[0]] = new Reg(Number(registrador[1]))

  inserir = prompt('Deseja inserir registrador? S|N ')
}
console.log(`\n\nREGISTRADORES:\n`)
printRegistradores(regMap)

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8')
  const contentArray = contents.split(/\r?\n/)
  return contentArray
}

const programa = syncReadFile('./programa.txt')
console.log(`PROGRAMA:\n`)
console.log(programa)

let programaRodando = true
let linha = 0
console.log('\nINICIA PROGRAMA\n')
while (programaRodando) {
  instrucao = programa[linha].split(' ')
  console.log(`${programa[linha]}`)
  switch (instrucao[1]) {
    case 'se':
      const teste = instrucao[2].split('_')
      if (teste[0] === 'zero') {
        let registrador = teste[1]
        const resultadoTeste = regMap[registrador].equalZero()

        if (resultadoTeste) {
          linha = instrucao[5] - 1
          console.log(`${instrucao[4]} ${instrucao[5]}\n`)
        } else {
          linha = instrucao[8] - 1
          console.log(`${instrucao[7]} ${instrucao[8]}\n`)
        }
      }

      break
    case 'faça':
      const operacao = instrucao[2].split('_')
      let registrador = operacao[1]
      if (operacao[0] === 'ad') {
        regMap[registrador].add()
      } else if (operacao[0] === 'sub') {
        regMap[registrador].sub()
      }
      linha = instrucao[4] - 1
      printRegistradores(regMap)
      break
  }
  if (programa.length < linha) {
    programaRodando = false
    console.log(`\n\nValores Finais:`)
    printRegistradores(regMap)
  }
}

function printRegistradores(obj) {
  Object.keys(obj).forEach(key => {
    console.log(key, obj[key])
  })
  console.log('\n')
}
