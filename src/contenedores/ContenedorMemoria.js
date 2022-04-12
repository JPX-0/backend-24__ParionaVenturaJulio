class ContenedorMemoria {
  constructor() {
    this.elementos = [];
  }

  getById(id) {
    const elem = this.elementos.find((elem) => elem.id == id);
    return elem || { error: `elemento no encontrado` };
  }

  getAll() {
    return [...this.elementos];
  }

  save(elem) {
    const findId = this.elementos.map(item => item.id);
    let newId;
    if(findId.length == 0) newId = 1;
    else newId = Math.max.apply(null, findId) + 1;

    const newElem = { ...elem, id: newId };
    this.elementos.push(newElem);
    return newElem;
  }

  update(elem) {
    const newElem = { ...elem, id: Number(elem.id) };
    const index = this.elementos.findIndex(p => p.id == elem.id);
    if(index == -1) return { error: `elemento no encontrado` };
    this.elementos[index] = newElem;
    return newElem;
  }

  deleteById(id) {
    const index = this.elementos.findIndex((elem) => elem.id == id);
    if(index == -1) return { error: `elemento no encontrado` };
    this.elementos.splice(index, 1);
  }

  deleteAll() {
    this.elementos = [];
  }
}

export default ContenedorMemoria; // Falta cambiar
