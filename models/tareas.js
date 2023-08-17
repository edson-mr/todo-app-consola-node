const Tarea = require("./tarea");
require("colors");

class Tareas {
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(description = "") {
    const tarea = new Tarea(description);
    this._listado[tarea.id] = tarea;
  }

  listarTareas() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      const indice = `${index + 1}.`.green;
      console.log(
        `${indice} ${tarea.description} :: ${
          tarea.completadoEn ? "Completada".green : "Pendiente".red
        }`
      );
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
      console.log("tarea borrada".bgRed);
    }
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let indice = 0;
    this.listadoArr.forEach((tarea) => {
      const { description, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      if (completadoEn && completadas) {
        indice += 1;
        console.log(`${(indice + ".").green} ${description} :: ${estado}`);
      }

      if (!completadoEn && !completadas) {
        indice += 1;
        console.log(`${(indice + ".").green} ${description} :: ${estado}`);
      }
    });
  }

  toogleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
