export default {
  PORT: process.env.PORT || 8080,
  mongoLocal: {
    client: `mongodb`,
    cnxStr: `mongodb://localhost:27017/coderhouse`
  },
  mongoRemote: {
    client: `mongodb`,
    cnxStr: `mongodb+srv://JulioCPV:Goteukemeyito9@backend-coderhouse.gevai.mongodb.net/coderhouse?retryWrites=true&w=majority`
  },
  fileSystem: {
    path: `./DB`
  }
};