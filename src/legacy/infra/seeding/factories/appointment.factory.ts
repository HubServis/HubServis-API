import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { StatusAppointment } from "../../../enums/models";
import Appointment from "../../database/postgres/models/Appointment";

define(Appointment, () => {
  const appointment = new Appointment();

  appointment.status = StatusAppointment.PENDING;
  appointment.date_time =  "20-02-2024-ISO";
  // appointment.user = faker.lorem.word(8);

  return appointment;
});
