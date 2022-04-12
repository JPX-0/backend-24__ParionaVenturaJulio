import "dotenv/config";

export default {
  PORT: process.env.PORT || 8080,
  mongoLocal: {
    client: "mongodb",
    cnxStr: "mongodb://localhost:27017/coderhouse"
  },
  mongoRemote: {
    client: "mongodb",
    cnxStr: process.env.DB_URI
  },
  fileSystem: {
    path: "./DB"
  }
};