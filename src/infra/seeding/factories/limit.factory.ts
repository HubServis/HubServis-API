import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { Limit } from "../../database/postgres/models/Limit";

define(Limit, () => {
  const limit = new Limit();

  limit.name = "Não pode fazer A";
  limit.description = faker.lorem.paragraph(6);
  limit.value = 0;
  limit.isControllable = true;
  limit.role = "nada";

  return limit;
});
