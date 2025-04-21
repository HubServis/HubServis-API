import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfessionalMigrations1686665548224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "professionals",
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
            isNullable: true,
          },
          {
            name: "cpfcnpj",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "isRegistred",
            type: "boolean",
          },
          {
            name: "user",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "business",
            type: "uuid",
          },
          {
            name: "appointments",
            type: "uuid",
            isArray: true,
          },
          {
            name: "blockings",
            type: "uuid",
          },
          {
            name: "expediencys",
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
            columnNames: ["user"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "BusinessKey",
            referencedTableName: "business",
            referencedColumnNames: ["id"],
            columnNames: ["business"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "AppointmentsKey",
            referencedTableName: "appointments",
            referencedColumnNames: ["id"],
            columnNames: ["appointments"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "BlockingsKey",
            referencedTableName: "blockings",
            referencedColumnNames: ["id"],
            columnNames: ["blockings"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "ExpediencysKey",
            referencedTableName: "expediencys",
            referencedColumnNames: ["id"],
            columnNames: ["expediencys"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("professionals");
  }
}
