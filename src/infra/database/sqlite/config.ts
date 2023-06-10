import "reflect-metadata";
import { DataSource } from "typeorm";

const Database = new DataSource({
  type: "sqlite",
  database: "./src/infra/database/sqlite/database.sqlite",
  entities: ["./src/infra/database/sqlite/models/**.ts"],
  migrations: ["./src/infra/database/migrations"],
  synchronize: true,
  logging: true,
});

export default Database.initialize();
