import { faker }  from "@faker-js/faker";
import { define } from "typeorm-seeding";
import Blocking from "../../database/postgres/models/Blocking";

define(Blocking, () => {
  const blocking = new Blocking();

  blocking.description = faker.lorem.paragraph(6);
  blocking.dateTimeStart = "20-02-2024-ISO";
  blocking.dateTimeEnd = "22-02-2024-ISO";
  blocking.allDay = false;
  blocking.allProfessionals = true;

  return blocking;
});
