import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import Product from "../../database/postgres/models/Product";

define(Product, () => {
  const product = new Product();

  product.name = "Esse product é um teste";
  product.description = faker.lorem.paragraph(6);
  product.price = 0;

  return product;
});
