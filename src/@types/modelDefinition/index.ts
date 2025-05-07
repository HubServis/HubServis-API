import { CollectionOf, Example, Groups, Nullable, Property, Required, Title, UniqueItems } from "@tsed/schema";

import { randomUUID, UUID } from "crypto";

import { Benefit, Business, Plan, Professional, Role, User } from "../../../generated/prisma";

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
    @Groups("createUser", "internal", "group.internal")
    public planId: string;

    @Title("Plan")
    @Property(() => PlanModelDefinition)
    @Required()
    @Groups("appendPlan", "group.plan")
    public plan: Plan;

    @Title("Business")
    @CollectionOf(() => BusinessModelDefinition)
    @Property(() => BusinessModelDefinition)
    @Groups("appendBussiness", "group.business")
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
    @Groups("appendBussiness", "group.business")
    public businessId: UUID;

    @Title("IsRegistered")
    @Example(true)
    @Property()
    public isRegistered: boolean;

    @Title("Business")
    @Property(() => BusinessModelDefinition)
    @Groups("appendBussiness", "group.business")
    public business: Business;

    @Title("Role")
    @CollectionOf(() => RoleModelDefinition)
    @Property(() => RoleModelDefinition)
    @Groups("appendRole", "group.role")
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
    @Groups("appendProfessional", "group.professional")
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
    @Groups("appendUser", "group.user")
    public ownerId: UUID;

    @Title("Owner")
    @Example(randomUUID())
    @Property(() => UserModelDefinition)
    @Groups("appendUser", "group.user")
    public owner: User;

    @Title("Professionals")
    @CollectionOf(ProfessionalModelDefinition)
    @Property(() => ProfessionalModelDefinition)
    @Groups("appendProfessional", "group.professional")
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
    @Required()
    @UniqueItems()
    @Example(randomUUID())
    @Property()
    public id: UUID;

    @Title("Name")
    @Required()
    @Example("Abaco")
    @Property()
    @Groups("creation", "group.plan")
    public name: string;

    @Title("Description")
    @Required()
    @Example("Descrição")
    @Property()
    @Groups("creation", "group.plan")
    public description: string;

    @Title("Price")
    @Example(200)
    @Required()
    @Property()
    @Groups("creation", "group.plan")
    public price: number;

    @Title("isPrivated")
    @Example(true)
    @Property()
    @Groups("creation", "group.plan")
    public isPrivated?: boolean;

    @Title("Users")
    @Required(false)
    @Nullable([])
    // @Property(() => UserModelDefinition)
    @CollectionOf(() => UserModelDefinition)
    @Groups("appendUser", "group.user")
    @Groups("creation", "group.plan")
    public users: User[];

    @Title("Benefits")
    @Required().Error("É preciso um Benefício criado antes")
    @CollectionOf(() => BenefitModelDefinition)
    @Groups("appendBenefit", "group.benefit")
    @Groups("creation", "group.plan")
    public benefits: Benefit[];
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
    @Example("0.2")
    @Property()
    public bonusPoint?: number;

    @Title("Plan")
    @CollectionOf(() => PlanModelDefinition)
    @Property(() => PlanModelDefinition)
    @Groups("appendPlan", "group.plan")
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
    @Groups("appendProfessional", "group.professional")
    public professionals: Professional[];
}

export class AuthModelDefinition {
    @Title("Email")
    @Example("teste@teste.com")
    @Property()
    public email: string;

    @Title("Password")
    @Example("12345")
    @Property()
    public password: string;
}
