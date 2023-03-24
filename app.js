require('colors');
const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = ()=>{
    console.log('Hola Mundo');

    mostrarMenu();
    
    //pausa();
}

main()