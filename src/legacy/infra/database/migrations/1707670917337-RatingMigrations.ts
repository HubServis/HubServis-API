import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RatingMigration1707670917337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ratings",
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
            name: "rating",
            type: "int",
          },
          {
            name: "comment",
            type: "varchar",
          },
          {
            name: "user",
            type: "uuid",
          },
          {
            name: "service",
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
          },
          {
            name: "ServiceKey",
            referencedTableName: "services",
            referencedColumnNames: ["id"],
            columnNames: ["service"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ratings");
  }
}
