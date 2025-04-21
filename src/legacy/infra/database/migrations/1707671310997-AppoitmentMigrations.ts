import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AppoitmentMigrations1707671310997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointments",
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
            name: "status",
            type: "varchar",
          },
          {
            name: "date_time",
            type: "varchar",
          },
          {
            name: "user",
            type: "uuid",
          },
          {
            name: "business",
            type: "uuid",
          },
          {
            name: "service",
            type: "uuid",
          },
          {
            name: "professional",
            type: "uuid",
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
            name: "UserKey",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["users"],
          },
          {
            name: "BusinessKey",
            referencedTableName: "business",
            referencedColumnNames: ["id"],
            columnNames: ["business"],
          },
          {
            name: "ServiceKey",
            referencedTableName: "services",
            referencedColumnNames: ["id"],
            columnNames: ["service"],
          },
          {
            name: "Professional",
            referencedTableName: "professionals",
            referencedColumnNames: ["id"],
            columnNames: ["professional"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointments");
  }
}
