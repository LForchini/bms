import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize("bms", "root", "password", {
  host: "bms-mysql",
  dialect: "mysql",

  dialectOptions: {
    connectTimeout: 100000,
  },

  define: {
    timestamps: false,
  },

  pool: {
    max: 25,
    min: 0,
    idle: 10000,
  },

  models: [__dirname + "/**/*.model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});
