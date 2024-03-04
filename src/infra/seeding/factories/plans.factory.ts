import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { Plan } from "../../database/postgres/models/Plan";

define(Plan, () => {
  const plan = new Plan();

  plan.name = "bronze";
  plan.isPrivated = false;
  plan.description = faker.lorem.paragraph(6);
  plan.price = 0;

  return plan;
});
