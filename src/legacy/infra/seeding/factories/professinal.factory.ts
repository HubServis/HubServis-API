import { define } from "typeorm-seeding";
import { Professional } from "../../database/postgres/models/Professional";

define(Professional, () => {
  const professional = new Professional();

  professional.name = "Romário";
  professional.cpfcnpj = "123-456-789-12";
  professional.isRegistered = true;

  return professional;
});
