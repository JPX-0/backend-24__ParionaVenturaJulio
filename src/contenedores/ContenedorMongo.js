import mongoose from 'mongoose';

class ContainerMongo {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  async generateID() {
    const docRef = await this.getAll();
    const findId = docRef.map(document => document.id);
    let newId;
    if(findId.length == 0) newId = 1;
    else newId = Math.max.apply(null, findId) + 1;
    return newId;
  }

  async getAll() {
    const documents = await this.model.find({}, { __v: 0 }).lean();
    console.log(documents);
    return documents;
  }

  async getById(id) {
    const document = await this.model.findOne({ id }, { __v: 0 });
    return document;
  }

  async save(payload) {
    const newElem = { ...payload, id: await this.generateID() };
    const docRef = new this.model(newElem);
    await docRef.save();
  }

  async update(payload) {
    const findId = await getById(payload.id);
    if(!findId) return { error: `elemento no encontrado` };
    const updatedDocument = await this.model.updateOne({ id: payload.id }, { $set: { ...payload } });
    return updatedDocument;
  }

  async deleteById(id) {
    return await this.model.deleteOne({ id });
  }

  async deleteAll() {
    return await this.model.deleteMany();
  }
}

export default ContainerMongo;