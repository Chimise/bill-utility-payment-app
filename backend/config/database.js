module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "nccomtech"),
        uri: env('DATABASE_URI', 'mongodb://127.0.0.1:27017/nccomtech')
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});
