import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import Service from "../../database/postgres/models/Service";

define(Service, () => {
  const service = new Service();

  service.name = "teste";
  service.price = '0';
  service.duration = "não sei";
  service.description = faker.lorem.paragraph(8);
  service.averageRating = 1;
  service.totalRatings = 1;
  service.totalValueRating = 1;

  return service;
});
