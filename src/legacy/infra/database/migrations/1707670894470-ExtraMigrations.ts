import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ExtraMigration1707670894470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "extras",
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
            name: "number",
            type: "int",
          },
          {
            name: "isControllable",
            type: "boolean",
            default: true,
          },
          {
            name: "role",
            type: "varchar",
          },
          {
            name: "user",
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("extras");
  }
}
