module.exports = ({ env }) => ({
    defaultConnection: "default",
    connections: {
      default: {
        connector: "mongoose",
        settings: {
          uri: env('DATABASE_URI'),
          database: env("DATABASE_NAME", "nccomtech"),
        },
        options: {
          authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
          ssl: env.bool(true),
        },
      },
    },
  });
  