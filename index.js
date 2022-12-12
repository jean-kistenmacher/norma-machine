// Trabalho desenvolvido por:
// Jean Matheus Backes Kistenmacher
// Luis Gustavo Machado Barcelos

const prompt = require('prompt-sync')()
const { readFileSync, promises: fsPromises } = require('fs')
class Reg {
  constructor(name, value) {
    this.name = name
    this.value = value
  }

  get getValue() {
    return this.value
  }

  get getName() {
    return this.name
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

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8')
  const contentArray = contents.split(/\r?\n/)
  return contentArray
}

function printRegistradores(obj) {
  Object.keys(obj).forEach(key => {
    console.log(obj[key])
  })
  console.log('\n')
}

function validarRegistradores(input) {
  let regex = /[A-Za-z0-9]+\/[0-9]+/i
  return regex.test(input)
}

function setRegValue(reg, value) {
  while (reg.getValue < value) {
    reg.add()
    console.log(`${reg.getName} Reg { value: ${reg.getValue}}`)
  }
}

function setRegValueZero(reg) {
  while (reg.getValue > 0) {
    reg.sub()
    console.log(`${reg.getName} Reg { value: ${reg.getValue}}`)
  }
}

let regMap = {}

let numRegistradores = prompt('Informe o número de registradores: ')
let indexRegistradores = 0

while (indexRegistradores < numRegistradores) {
  let regValue = prompt('Insira Registrador/Valor? Reg/Val ')
  const registradorValido = validarRegistradores(regValue)
  if (registradorValido) {
    let registrador = regValue.split('/')
    regMap[registrador[0]] = new Reg(registrador[0], Number(registrador[1]))
    indexRegistradores++
  } else {
    console.log('\nRegistrador Inválido. Tente novamente!\n')
  }
}

console.log('\nINICIANDO PROGRAMA\n')

console.log(`\n\nREGISTRADORES:\n`)
printRegistradores(regMap)

const programa = syncReadFile('./programa.txt')

console.log(`PROGRAMA:\n`)
console.log(programa)

let programaRodando = true
let linha = 0

console.log('\nPROGRAMA COMPUTADO\n')
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
      } else {
        const macro = instrucao[2].split(':=')
        registrador = regMap[macro[0]]
        const macroValue = Number(macro[1])
        if (macroValue === 0) {
          setRegValueZero(registrador)
        } else if (macroValue > 0) {
          setRegValueZero(registrador)
          setRegValue(registrador, macroValue)
        }
      }
      linha = instrucao[4] - 1
      console.log('\n')
      printRegistradores(regMap)
      break
  }
  if (programa.length < linha) {
    programaRodando = false
    console.log(`\n\nValores Finais:`)
    printRegistradores(regMap)
  }
}
