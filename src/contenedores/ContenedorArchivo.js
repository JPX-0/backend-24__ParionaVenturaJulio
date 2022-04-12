import { promises as fs } from "fs";

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getById(id) {
    const elems = await this.getAll();
    const buscado = elems.find((e) => e.id == id);
    return buscado;
  }

  async getAll() {
    try {
      const elems = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(elems);
    } catch (error) {
      return [];
    }
  }

  async save(elem) {
    const elems = await this.getAll();

    const findId = elems.map(item => item.id);
    let newId;
    if(findId.length == 0) newId = 1;
    else newId = Math.max.apply(null, findId) + 1;

    const newElem = { ...elem, id: newId };
    elems.push(newElem);

    try {
      await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
      return newId;
    } catch(error) {
      throw new Error(`Error al guardar: `, error);
    }
  }

  async update(elem) {
    const elems = await this.getAll();
    const index = elems.findIndex((e) => e.id == elem.id);
    if(index == -1) throw new Error(`Error al actualizar: no se encontró el id ${elem.id}`);
		elems[index] = elem;
		try {
			await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
		} catch(error) {
			throw new Error(`Error al actualizar: `, error);
		}
  }

  async deleteById(id) {
    const elems = await this.getAll();
    const index = elems.findIndex((e) => e.id == id);
    if(index == -1) throw new Error(`Error al borrar: no se encontró el id ${id}`);
    elems.splice(index, 1);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
    } catch(error) {
      throw new Error(`Error al borrar: `, error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar todo: `, error);
    }
  }
}

export default ContenedorArchivo; // Falta cambiar