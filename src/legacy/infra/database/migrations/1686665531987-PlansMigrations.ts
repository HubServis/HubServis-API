import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PlansMigrations1686665531987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "plans",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            default: "uuid_generation_v4",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "isPrivated",
            type: "boolean",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "price",
            type: "int",
          },
          {
            name: "benefits",
            type: "uuid",
            isArray: true,
          },
          {
            name: "limits",
            type: "uuid",
            isArray: true,
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
            name: "BenefitsKey",
            referencedTableName: "benefits",
            referencedColumnNames: ["id"],
            columnNames: ["benefits"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "LimitsKey",
            referencedTableName: "limits",
            referencedColumnNames: ["id"],
            columnNames: ["limits"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("plans");
  }
}
