// import productsSchema from '../../scripts/crearTabla.js';
// import ContainerMongo from '../contenedores/ContenedorMongo.js';
import config from '../config.js'

import ContenedorArchivo from '../contenedores/ContenedorArchivo.js'

const productsApi = new ContenedorArchivo(`${config.fileSystem.path}/productos.json`)
// const productsApi = new ContainerMongo("products", productsSchema)

export default productsApi;