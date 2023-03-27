const Tarea = require('./tarea');

/**
 * _listado:
 * {uuid-1323123.123123.123123, desc:12, completado en: 9000}
 */
class Tareas {
    
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }    
    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ' '){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }


    cargarTareaFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
        
    }

    listadoCompletadas( completado = true){
        console.log();
        let contador = 1;
        this.listadoArr.forEach((tarea) => {

            const {desc, completadoEn} = tarea;
            
            if(completado){
                if(completadoEn){
                    
                    console.log(`${(contador+'.').green} ${desc} :: ${'Completada'.green}`);
                    contador += 1;
                }
            } else {
                if(!completadoEn){

                    console.log(`${(contador+'.').green} ${desc} :: ${'Pendiente'.red}`);
                    contador += 1;
                }
            }
        });
    }

    listadoPendientes(){
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = completadoEn;
            if(!estado){
                console.log(`${idx} ${desc} :: ${'Pendiente'.red}`);
            }
        });
    }

    marcarCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }


    crearTarea(desc = ''){

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }
}

module.exports = Tareas;