require('colors');
const { guardarDB, leerDB} = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inqui');

const Tareas = require('./models/tareas');
console.clear();

const main = async() => {
    
    let opt = '';
    //instanciar tareas
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        //cargar tareas
        tareas.cargarTareaFromArray(tareasDB);
    }
    
    
    do {
        opt = await inquirerMenu();



        switch(opt){
            case '1':
                //crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listadoCompletadas(true);
            break;
            case '4':
                tareas.listadoCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.marcarCompletadas(ids);
                 
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                //confirmacion
                if(id !== '0'){
                    const ok = await confirmar('Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }

                }
            break;
        };
        
        guardarDB(tareas.listadoArr);
        console.log('\n')
        await pausa();


    }while(opt !== '0');

};

main();