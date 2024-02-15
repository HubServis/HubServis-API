import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ExpedientMigration1707670945735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "expediencys",
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
            name: "description",
            type: "varchar",
          },
          {
            name: "expediencysInfos",
            type: "varchar",
          },
          {
            name: "business",
            type: "uuid",
          },
          {
            name: "professionals",
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
            name: "ProfessionalsKey",
            referencedTableName: "professionals",
            referencedColumnNames: ["id"],
            columnNames: ["professionals"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("expediencys");
  }
}
