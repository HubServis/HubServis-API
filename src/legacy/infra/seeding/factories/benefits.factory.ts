import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { Benefit } from "../../database/postgres/models/Benefit";

define(Benefit, () => {
  const benefit = new Benefit();

  benefit.name = faker.lorem.word(8);
  benefit.description = faker.lorem.paragraph(6);
  benefit.max_value = 0;
  benefit.isControllable = true;
  benefit.role = "nada";

  return benefit;
});
