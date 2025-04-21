import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import Business from "../../database/postgres/models/Business";

define(Business, () => {
  const business = new Business();

  business.name = "HubServis";

  return business;
});
