require("dotenv/config");

const config = {
  mongodb: {
    url: process.env.DB_CONNECTION,
    databaseName: process.env.DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "commonjs",
};

module.exports = config;
