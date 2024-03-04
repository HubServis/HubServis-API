import { define } from "typeorm-seeding";
import { Extra } from "../../database/postgres/models/Extra";

define(Extra, () => {
  const extra = new Extra();

  extra.name = "new extra";
  extra.description = "test";
  extra.value = 0;
  extra.isControllable = true;
  extra.role = "nada";

  return extra;
});
