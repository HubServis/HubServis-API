import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import Category from "../../database/postgres/models/Category";

define(Category, () => {
  const category = new Category();

  category.name = "Nova Categoria";
  category.nameId = "nova_categoria";
  category.description = faker.lorem.paragraph(6);
  category.isPrivated = true;

  return category;
});
