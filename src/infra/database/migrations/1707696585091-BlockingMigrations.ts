import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class BlockingMigrations1707696585091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "blockings",
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
            name: "dateTimeStart",
            type: "varchar",
          },
          {
            name: "dateTimeEnd",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "allDay",
            type: "boolean",
            default: false,
          },
          {
            name: "allProfessionals",
            type: "boolean",
            default: true,
          },
          {
            name: "business",
            type: "uuid",
          },
          {
            name: "professional",
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
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("blockings");
  }
}
