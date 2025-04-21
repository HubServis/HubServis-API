import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import Rating from "../../database/postgres/models/Rating";

define(Rating, () => {
  const rating = new Rating();

  rating.rating = 1;
  rating.comment = faker.lorem.words(5);

  return rating;
});
