const inquirer = require("inquirer");
require("colors");

const prompt = inquirer.createPromptModule();

const inquirerMenu = async () => {
  const { opcion } = await prompt([
    {
      type: "list",
      name: "opcion",
      message: `¿Qué desea hacer?`.toUpperCase().yellow,
      choices: [
        {
          value: "1",
          name: `${"1.".green} Crear tarea`,
        },
        {
          value: "2",
          name: `${"2.".green} Listar tareas`,
        },
        {
          value: "3",
          name: `${"3.".green} Listar tareas completadas`,
        },
        {
          value: "4",
          name: `${"4.".green} Listar tareas pendientes`,
        },
        {
          value: "5",
          name: `${"5.".green} Completar tarea(s)`,
        },
        {
          value: "6",
          name: `${"6.".green} Borrar tarea`,
        },
        {
          value: "0",
          name: `${"0.".green} Salir`,
        },
      ],
    },
  ]);

  return opcion;
};

const pausa = async () => {
  await prompt([
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
};

const leerInput = async (message) => {
  const { description } = await prompt([
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ]);

  return description;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const indice = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${indice} ${tarea.description}`,
    };
  });

  choices.unshift({ value: "0", name: `${"0.".green} Cancelar` });

  const { id } = await prompt([
    {
      type: "list",
      name: "id",
      message: `¿Qué tarea desea borrar?`.toUpperCase().yellow,
      choices,
    },
  ]);

  return id;
};

const confirmar = async () => {
  const { ok } = await prompt([
    {
      type: "confirm",
      name: "ok",
      message: "¿Estás seguro que deseas borrar la tarea?",
    },
  ]);

  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const indice = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${indice} ${tarea.description}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const { ids } = await prompt([
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ]);

  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
};
