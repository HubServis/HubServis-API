"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Database = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./src/infra/database/sqlite/database.sqlite",
    entities: ["./src/infra/database/sqlite/models/**.ts"],
    synchronize: true,
    // logging: false,
});
exports.default = Database.initialize();
