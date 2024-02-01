import { Service } from "../../../../entities/Service";
import { Appointment as AppointmentSchema } from "../models/Appointment";
import { User as UserSchema } from "../models/User";
import { Service as ServiceSchema } from "../models/Service";
import { Professional as ProfessionalSchema } from "../models/Professional";
import { Business as BusinessSchema } from "../models/Business";
import { Expedient as ExpedientSchema } from "../models/Espedient";
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
import exp from "constants";

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

	if (dateNewTime < dateTimeBd && endNewTime >= dateTimeBd) {
		return false;
	}

	if (dateNewTime >= dateTimeBd && dateNewTime <= endTimeBD) {
		return false;
	}

	return true;
};

function isWorkingTime(dateTimeString, dateTimeEndString, schedule = []) {
	const startDate = new Date(dateTimeString);
	const endDate = new Date(dateTimeEndString);
	const weekDay = getWeekDay(startDate);

	// Encontrar o dia da semana no array de expediente
	const workingDay = schedule.find((day) => day.weekDay === weekDay);

	if (!workingDay) {
		return false; // Não é um dia de trabalho
	}

	// Verificar se a hora inicial está dentro do expediente
	const startTime = new Date(`1970-01-01T${workingDay.timeStart}:00`);
	const endTime = new Date(`1970-01-01T${workingDay.timeEnd}:00`);
	const startDateTime = new Date(
		`1970-01-01T${getFormattedTime(startDate)}:00`
	);

	if (startDateTime < startTime || startDateTime > endTime) {
		return false;
	}

	// Verificar se há horário de almoço e se o agendamento está dentro do expediente
	if (workingDay.lunchStart !== "00:00" && workingDay.lunchEnd !== "00:00") {
		const lunchStartTime = new Date(`1970-01-01T${workingDay.lunchStart}:00`);
		const lunchEndTime = new Date(`1970-01-01T${workingDay.lunchEnd}:00`);

		// Verificar se o agendamento está totalmente fora do horário de almoço
		if (
			(startDateTime < lunchStartTime && endDate <= lunchStartTime) ||
			(startDateTime >= lunchEndTime && endDate > lunchEndTime)
		) {
			return true;
		}

		// Verificar se o agendamento não colide com o horário de almoço
		if (
			(startDateTime < lunchStartTime && endDate > lunchStartTime) ||
			(startDateTime < lunchEndTime && endDate > lunchEndTime)
		) {
			return false; // Conflito com horário de almoço
		}
	}

	// Verificar se a hora final está dentro do expediente
	const endDateTime = new Date(`1970-01-01T${getFormattedTime(endDate)}:00`);
	if (endDateTime < startTime || endDateTime > endTime) {
		return false;
	}

	return true;
}

function getWeekDay(date) {
	const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
	return daysOfWeek[date.getDay()];
}

function getFormattedTime(date) {
	return date.toTimeString().slice(0, 5);
}

function addHourMinute(dateString, hourMinuteString) {
	const date = new Date(dateString);
	const [hour, minute] = hourMinuteString.split(":");
	date.setHours(date.getHours() + parseInt(hour, 10));
	date.setMinutes(date.getMinutes() + parseInt(minute, 10));

	const newDateString = `${date.getFullYear()}-${padZero(
		date.getMonth() + 1
	)}-${padZero(date.getDate())}T${padZero(date.getHours())}:${padZero(
		date.getMinutes()
	)}:${padZero(date.getSeconds())}`;

	return newDateString;
}

function padZero(number) {
	return number < 10 ? `0${number}` : number;
}

export class AppointmentRepositoryPostgres implements IAppointmentsRepository {
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
		const expedientRepository = (await Database).getRepository(ExpedientSchema);

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

		const expedient = await expedientRepository.find({
			relations: {
				business: true,
			},
			where: {
				business: {
					id: business.id,
				},
			},
		});

		if (!expedient || expedient.length == 0) {
			return new Error(
				"This business does not have opening hours to schedule a service"
			);
		}

		if (
			!isWorkingTime(
				date_time,
				addHourMinute(date_time, service.duration),
				JSON.parse(
					Buffer.from(expedient[0]?.expediencysInfos, "base64").toString(
						"utf-8"
					)
				)
			)
		) {
			return new Error(
				"It was not possible to schedule an appointment as the schedule is not in our working hours!"
			);
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
					const appointment = await appointmentRepository.save({
						id: uuid(),
						date_time: props.date_time,
						status: StatusAppointment.PENDING,
						professional,
						service,
						user,
						business,
						// professional: "489336ae-9c9d-4c02-8ef0-c047848da272",
						// service: "f692f8a3-7dd5-4f5c-a108-98eb36ff1d4f",
						// business: "cded4e7f-4a56-4f29-9bf6-71dc80782e48",
						// user: "a7a24e6b-cada-4329-9265-ce55726cbb8d"
					});

					return appointment;
					// return new Error("Agendado!");
				}
			}

			return new Error("Não foi possivel agendar!");
		}

		const appointment = await appointmentRepository.save({
			id: uuid(),
			date_time: props.date_time,
			status: StatusAppointment.PENDING,
			professional,
			service,
			user,
			business,
			// professional: "489336ae-9c9d-4c02-8ef0-c047848da272",
			// service: "f692f8a3-7dd5-4f5c-a108-98eb36ff1d4f",
			// business: "cded4e7f-4a56-4f29-9bf6-71dc80782e48",
			// user: "a7a24e6b-cada-4329-9265-ce55726cbb8d"
		});

		return appointment;
		// return new Error("Agendado! 2");
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

	public async findAppointmentsUser(props: string): Promise<Error | Appointment[]> {
		const userId = props;

		const appointmentRepository = (await Database).getRepository(
			AppointmentSchema
		);

		const appointment = await appointmentRepository.find({
			relations: ["user", "business", "professional", "service"],
			where: {
				user: {
					id: userId,
				},
			},
			order: {
				date_time: "DESC",
			},
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
