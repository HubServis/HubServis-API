import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "../../seeds/MainSeeder";

const options: DataSourceOptions & SeederOptions = {
  type: "sqlite",
  database: "./src/infra/database/sqlite/database.sqlite",
  entities: ["./src/infra/database/sqlite/models/**.ts"],
  migrations: ["./src/infra/database/migrations"],
  synchronize: true,
  logging: false,
  seeds: [MainSeeder]
};

export const AppDataSource = new DataSource(options);

export default new DataSource(options).initialize();

