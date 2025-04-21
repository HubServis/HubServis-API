import { CollectionOf, Example, Property, Title } from "@tsed/schema";

import { randomUUID, UUID } from "crypto";

import { Business, Plan, Professional, Role, User } from "../../../generated/prisma";

export class UserModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("Email")
    @Example("teste@teste.com")
    @Property()
    public email: string;

    @Title("CpfCnpj")
    @Example("123456789x")
    @Property()
    public cpfcnpj: string;

    @Title("Username")
    @Example("abaco_xamp")
    @Property()
    public username: string;

    @Title("Password")
    @Example("senhaSegura")
    @Property()
    public password: string;

    @Title("Image")
    @Example("uma imagem")
    @Property()
    public image?: Blob | string;

    @Title("PlanId")
    @Example("131231241231241231")
    @Property()
    public planId: string;

    @Title("Plan")
    @Property(() => PlanModelDefinition)
    public plan: Plan;

    @Title("Business")
    @Property(() => BusinessModelDefinition)
    public business: Business[];
}

export class ProfessionalModelDefinition {
    @Title("ID")
    @Example("0")
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("CpfCnpj")
    @Example("123456789x")
    @Property()
    public cpfcnpj: string;

    @Title("BusinessID")
    @Example("123jl12j3l141411241241k2j")
    @Property()
    public businessId: UUID;

    @Title("IsRegistered")
    @Example(true)
    @Property()
    public isRegistered: boolean;

    @Title("Business")
    @Property(() => BusinessModelDefinition)
    public business: Business;

    @Title("Role")
    @CollectionOf(() => RoleModelDefinition)
    @Property(() => RoleModelDefinition)
    public role: Role[];
}

export class ScheduleModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Status")
    @Example("Ocupado")
    @Property()
    public name: string;

    @Title("DateTime")
    @Example(new Date())
    @Property()
    public dateTime: string;
}

export class ExpedientModelDefinition {
    @Title("ID")
    @Example("0")
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Name")
    @Property()
    public name: string;

    @Title("Description")
    @Example("Here is A")
    @Property()
    public description: string;

    @Title("Expedient Info")
    @Example("A Vai fazer B")
    @Property()
    public expedientInfo: string;
}

export class BlockingModelDefinition {
    @Title("ID")
    @Example("0")
    @Property()
    public id: UUID;

    @Title("Date Time Start")
    @Example(new Date())
    @Property()
    public dateTimeStart: string;

    @Title("Date Time End")
    @Example(new Date())
    @Property()
    public dateTimeEnd: string;

    @Title("Description")
    @Example("Será feito um Corte em A")
    @Property()
    public description: string;

    @Title("All Day")
    @Example(false)
    @Property()
    public allDay?: boolean;

    @Title("All Professionals")
    @Example(true)
    @Property()
    public allProfessionals: boolean;
}

export class BusinessModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("Owner ID")
    @Example(randomUUID())
    @Property()
    public ownerId: UUID;

    @Title("Owner")
    @Example(randomUUID())
    @Property()
    public owner: string;

    @Title("Professionals")
    @CollectionOf(ProfessionalModelDefinition)
    @Property(() => ProfessionalModelDefinition)
    public professionals: Professional[];
}

export class CategoryModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("Name ID")
    @Example(randomUUID())
    @Property()
    public nameId: UUID;

    @Title("Description")
    @Example("Descrição")
    @Property()
    public description: string;

    @Title("IsPrivate")
    @Example(true)
    @Property()
    public IsPrivate: boolean;
}

export class ServiceModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("Price")
    @Example(200)
    @Property()
    public price: number;

    @Title("Duration")
    @Example("10h")
    @Property()
    public duration: number;

    @Title("Description")
    @Example("Descrição")
    @Property()
    public description: string;

    @Title("IsPrivate")
    @Example(true)
    @Property()
    public IsPrivate?: boolean;
}

export class RatingModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Comment")
    @Example("Achei legal")
    @Property()
    public comment: string;

    @Title("Rating")
    @Example(2)
    @Property()
    public rating: number;
}

export class PlanModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("Description")
    @Example("Descrição")
    @Property()
    public description: string;

    @Title("Price")
    @Example(200)
    @Property()
    public price: number;

    @Title("IsPrivate")
    @Example(true)
    @Property()
    public IsPrivate?: boolean;

    @Title("Users")
    @Property(() => UserModelDefinition)
    public users: User[];
}

export class BenefitModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("Description")
    @Example("Descrição")
    @Property()
    public description: string;

    @Title("Value")
    @Example(200)
    @Property()
    public value: number;

    @Title("Bonus Point")
    @Example(0.2)
    @Property()
    public bonusPoint?: number;

    @Title("Plan")
    @Property(PlanModelDefinition)
    public plan: Plan[];
}

export class RoleModelDefinition {
    @Title("ID")
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Example("Abaco")
    @Property()
    public name: string;

    @Title("Professionals")
    @Example(ProfessionalModelDefinition)
    @Property()
    public professionals: Professional[];
}
