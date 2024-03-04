import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import Expedient from "../../database/postgres/models/Espedient";

define(Expedient, () => {
  const expediente = new Expedient();

  expediente.name = "Novo expediente";
  expediente.description = faker.lorem.paragraph(6);
  expediente.expediencysInfos = "Não sei o que colocar aqui";

  return expediente;
});
