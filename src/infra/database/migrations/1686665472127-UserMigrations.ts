import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigrations1686665472127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            default: "uuid_generated_v4",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "cpfcnpj",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "ratings",
            type: "uuid",
            isArray: true,
          },
          {
            name: "extras",
            type: "uuid",
            isArray: true,
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "appointments",
            type: "uuid",
            isArray: true,
            isNullable: true,
          },
          {
            name: "business",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "professional",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "plan",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "category",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "RatingsKey",
            referencedTableName: "ratings",
            referencedColumnNames: ["id"],
            columnNames: ["ratings"],
          },
          {
            name: "ExtrasKey",
            referencedTableName: "extras",
            referencedColumnNames: ["id"],
            columnNames: ["extras"],
          },
          {
            name: "AppointmentsKey",
            referencedTableName: "appointments",
            referencedColumnNames: ["id"],
            columnNames: ["appointments"],
          },
          {
            name: "BusinessKey",
            referencedTableName: "business",
            referencedColumnNames: ["id"],
            columnNames: ["business"],
          },
          {
            name: "ProfessionalKey",
            referencedTableName: "professionals",
            referencedColumnNames: ["id"],
            columnNames: ["professional"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "PlanKey",
            referencedTableName: "plans",
            referencedColumnNames: ["id"],
            columnNames: ["plan"],
          },
          {
            name: "CategoryKey",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
