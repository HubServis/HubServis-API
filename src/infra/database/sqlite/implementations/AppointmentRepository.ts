import { Service } from "../../../../entities/Service";
import { Appointment as AppointmentSchema } from "../models/Appointment";
import { User as UserSchema } from "../models/User";
import { Service as ServiceSchema } from "../models/Service";
import { Professional as ProfessionalSchema } from "../models/Professional";
import { Business as BusinessSchema } from "../models/Business";
import Database from "../config";
import {
	IAppointmentsRepository,
	ICreateAppointment,
	IPatchStatusAppointment,
} from "../../../../repositories/AppointmentRepository";
import { Appointment } from "../../../../entities/Appointment";
import { v4 as uuid } from "uuid";
import { StatusAppointment } from "../../../../enums/models";
import { log } from "console";
import { isAfter, isExists, isFuture, isPast, isValid } from "date-fns";

const parseTimeToMinutes = (time) => {
	const [hours, minutes] = time.split(":");
	return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

const verifyAppointment = ({
	timeService,
	timeServiceNewAppointment: timeServiceNewAppointmentProps,
	restTime,
	dateTime,
	dateNewTime: dateNewTimeProps,
}) => {
	const tempoServico = parseTimeToMinutes(timeService);
	const timeServiceNewAppointment = parseTimeToMinutes(
		timeServiceNewAppointmentProps
	);
	const tempoDescanso = parseTimeToMinutes(restTime);
	const dateTimeBd: any = new Date(dateTime);
	const dateNewTime: any = new Date(dateNewTimeProps);

	const endTimeBD: Number =
		dateTimeBd.getTime() + (tempoServico + tempoDescanso) * 60000;
	const endNewTime: Number =
		dateNewTime.getTime() + (timeServiceNewAppointment + tempoDescanso) * 60000;

	log("tempoDescanso", tempoDescanso);
	log("tempoServico", tempoServico);
	log("timeServiceNewAppointment", timeServiceNewAppointment);
	log("dateTimeBd", dateTime, dateTimeBd);
	log("dateNewTime", dateNewTimeProps, dateNewTime);

	if (dateNewTime < dateTimeBd && endNewTime >= dateTimeBd) {
		return false;
	}

	if (dateNewTime >= dateTimeBd && dateNewTime <= endTimeBD) {
		return false;
	}

	return true;
};

export class AppointmentRepositorySqlite implements IAppointmentsRepository {
	public async create(props: ICreateAppointment): Promise<Error | Appointment> {
		// const { id, name, duration, price, description } = props;
		const { date_time } = props;
		const restTimeBusiness = "00:10";

		const appointmentRepository = (await Database).getRepository(
			AppointmentSchema
		);
		const userRepository = (await Database).getRepository(UserSchema);
		const serviceRepository = (await Database).getRepository(ServiceSchema);
		const professionalRepository = (await Database).getRepository(
			ProfessionalSchema
		);
		const businessRepository = (await Database).getRepository(BusinessSchema);

		/*
			const user = await userRepository.findOne({
			where: {
				id: userId,
			},
			relations: ["business"],
			});

			if (!user.business) {
			return new Error("The user does not have a business!");
			}
		*/

		// ---------------------------------------
		if (
			!isExists(
				new Date(date_time).getFullYear(),
				new Date(date_time).getMonth(),
				new Date(date_time).getDay()
			) ||
			!isValid(new Date(date_time))
		) {
			return new Error("Date not exists or not is valid!");
		}

		if (!isFuture(new Date(date_time)))
			return new Error("That date is in the past!");

		const service = await serviceRepository.findOne({
			where: {
				id: props.service,
			},
			relations: ["business"],
		});

		if (!service) {
			return new Error("Service not found!");
		}

		const appointments = await appointmentRepository
			.createQueryBuilder("appointment")
			.leftJoinAndSelect("appointment.service", "service")
			.where("DATE(appointment.date_time) = :dataEspecifica", {
				dataEspecifica: date_time.split("T")[0],
			})
			.getMany();

		// log(appointments);

		// log("CHEGOU NO FIM");

		// -------------------

		const user = await userRepository.findOne({
			where: {
				id: props.client,
			},
		});

		if (!user) {
			return new Error("User not found!");
		}

		const business = await businessRepository.findOne({
			where: {
				id: service.business.id,
			},
		});

		if (!business) {
			return new Error("Business not found!");
		}

		const professional = await professionalRepository.findOne({
			where: {
				id: props.professional,
			},
			relations: ["business"],
		});

		if (professional.business.id !== business.id) {
			return new Error("Professional does not belong to the service company!");
		}

		if (appointments.length > 0) {
			for (let i = 0; i < appointments.length; i++) {
				if (
					verifyAppointment({
						dateTime: appointments[i].date_time,
						timeService: appointments[i].service.duration,
						dateNewTime: date_time,
						timeServiceNewAppointment: service.duration,
						restTime: restTimeBusiness,
					})
				) {
					// const appointment = await appointmentRepository.save({
					// 	id: uuid(),
					// 	date_time: props.date_time,
					// 	status: StatusAppointment.PENDING,
					// 	professional,
					// 	service,
					// 	user,
					// 	business,
					// 	// professional: "489336ae-9c9d-4c02-8ef0-c047848da272",
					// 	// service: "f692f8a3-7dd5-4f5c-a108-98eb36ff1d4f",
					// 	// business: "cded4e7f-4a56-4f29-9bf6-71dc80782e48",
					// 	// user: "a7a24e6b-cada-4329-9265-ce55726cbb8d"
					// });

					// return appointment;
					return new Error("Agendado!");
				}
			}

			return new Error("Não foi possivel agendar!");
		}

		// const appointment = await appointmentRepository.save({
		//   id: uuid(),
		//   date_time: props.date_time,
		//   status: StatusAppointment.PENDING,
		//   professional,
		//   service,
		//   user,
		//   business,
		//   // professional: "489336ae-9c9d-4c02-8ef0-c047848da272",
		//   // service: "f692f8a3-7dd5-4f5c-a108-98eb36ff1d4f",
		//   // business: "cded4e7f-4a56-4f29-9bf6-71dc80782e48",
		//   // user: "a7a24e6b-cada-4329-9265-ce55726cbb8d"
		// });

		// return appointment;
		return new Error("Agendado! 2");
		// return new Error("Bom Jú");
	}

	public async find(): Promise<Error | Appointment[]> {
		const appointmentRepository = (await Database).getRepository(
			AppointmentSchema
		);

		const appointment = await appointmentRepository.find({
			relations: ["user", "business", "professional"],
		});

		return appointment;
	}

	public async patch(
		props: IPatchStatusAppointment
	): Promise<Error | Appointment> {
		const { id, status, userReqId, date_time } = props;

		if (!id) {
			return new Error("Id not given!");
		}

		if (!status) {
			return new Error("Status not given!");
		}

		const appointmentRepository = (await Database).getRepository(
			AppointmentSchema
		);

		const appointment = await appointmentRepository.findOne({
			where: {
				id: id,
			},
			relations: {
				user: true,
				business: {
					user: true,
				},
			},
		});

		if (
			appointment.user.id == userReqId ||
			appointment.business.user.id == userReqId
		) {
			const statusType = {
				"1": StatusAppointment.COMPLETED,
				"2": StatusAppointment.PENDING,
				"3": StatusAppointment.CANCELED,
			};

			appointment.status = statusType[status] || StatusAppointment.PENDING;
			if (date_time != null || date_time != undefined) {
				appointment.date_time = date_time;
			}

			await appointmentRepository.save(appointment);

			return appointment;
		}

		return new Error(
			"Appointment does not belong to or was not made by the user informed!"
		);
	}
}
