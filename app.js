require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opcion = "0";
  const tareas = new Tareas();

  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opcion = await inquirerMenu();
    switch (opcion) {
      case "1":
        const description = await leerInput("descripción: ");
        tareas.crearTarea(description);
        break;
      case "2":
        tareas.listarTareas();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        console.log("ids", ids);
        tareas.toogleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const decision = await confirmar();
          if (decision) tareas.borrarTarea(id);
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    if (opcion !== "0") await pausa();
  } while (opcion !== "0");
};

main();
