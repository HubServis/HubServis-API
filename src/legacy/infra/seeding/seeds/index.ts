import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import { options } from "../../database/postgres/config";

const seeds = async () => {
  const dataSource = new DataSource(options);

  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: ["src/infra/seeding/seeds/**/*{.ts,.js}"],
  }).then((res) => console.log("seeds finished? ", res));

  process.exit();
}

seeds();
