import { define } from "typeorm-seeding";
import { User } from "../../database/postgres/models/User";

define(User, () => {
  const user = new User();

  user.name = "Ramilthon BMW 2";
  user.username = "Ramilthonbmw2";
  user.password = "hamilthon";
  user.email = "ramilthonbmw2@gmail.com";
  user.cpfcnpj = "22222222211";

  return user;
});
