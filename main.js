const esprima = require('esprima');
const safeEval = require('notevil');
const editor = document.getElementById("editor");
const compileButton = document.getElementById("compileButton");
const resultado = document.getElementById('resultado')
const analizadorLexico = document.getElementById('lexico')
const analizadorSintactico = document.getElementById('sintactico')
const analizadorSemantico = document.getElementById('semantico')
const about = document.getElementById('about')


analizadorLexico.addEventListener('click', () => {
  const result = lexico(editor.value)
  resultado.value = JSON.stringify(result, undefined, 3)
})

analizadorSintactico.addEventListener('click', () => {
  const result = parse(editor.value)
  resultado.value = JSON.stringify(result, undefined, 3)
})

analizadorSemantico.addEventListener('click', () => analisisSemantico(editor.value))

const analisisSemantico = (program) => {

  try {
    const result = safeEval(program)
    resultado.value = JSON.stringify(result, undefined, 3)
  } catch (error) {
    resultado.value = error;
  }
}

/*Realizar compilacion */
compileButton.addEventListener("click", () => analisisSemantico(editor.value));

/*Analizador Lexico */
const lexico = (program) => esprima.tokenize(program);

//Compilador sintactico

const parse = program => {
  try {
    return esprima.parseScript(program)
  } catch (err) {
    return `¡ERROR! ${err.description}`
  }

};

about.addEventListener('click', () => {
  console.log(`27757077 Durán Estefanny
  27197182 Chacín Julio
  27284208 Delgado Sergio
  27339876 Villalobos Michell
  27056028 Granados Klissman`)
})
