const { v4: uuid } = require("uuid");

class Tarea {
  id = "";
  description = "";
  completadoEn = null;
  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
