import dotenv from "dotenv";
dotenv.config();

export default {
  keycloak: {
    origin: {
      clientSecret: process.env.KEYCLOAK_ORIGIN_SECRET,
      username: process.env.KEYCLOAK_ORIGIN_USER,
      password: process.env.KEYCLOAK_ORIGIN_PASSWORD,
      host: process.env.KEYCLOAK_ORIGIN_HOST,
      realm: process.env.KEYCLOAK_ORIGIN_REALM,
    },
    target: {
      clientSecret: process.env.KEYCLOAK_TARGET_SECRET,
      username: process.env.KEYCLOAK_TARGET_USER,
      password: process.env.KEYCLOAK_TARGET_PASSWORD,
      host: process.env.KEYCLOAK_TARGET_HOST,
      realm: process.env.KEYCLOAK_TARGET_REALM,
    },
  },
};
