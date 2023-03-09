import "reflect-metadata";
import { DataSource } from "typeorm";

const Database = new DataSource({
    type: "sqlite",
    database: "./src/infra/database/sqlite/database.sqlite",
    entities: ["./src/infra/database/sqlite/models/**.ts"],
    // entities: ["./src/entities/**.ts"],
    synchronize: true,
    // logging: false,
})

export default Database.initialize();