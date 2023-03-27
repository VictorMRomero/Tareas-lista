const inquierer = require('inquirer');
require('colors');

let preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: ['1. Crear lista', 'opt2', 'opt3']
    }
]

const inquirerMenu = async() => {


    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('==========================\n'.green);

    const opt = await inquierer.prompt(preguntas);

    return opt;
}

module.exports = {
    inquirerMenu
}