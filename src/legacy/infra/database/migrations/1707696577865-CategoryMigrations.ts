import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CategoryMigrations1707696577865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
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
            name: "nameId",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "isPrivated",
            type: "varchar",
          },
          {
            name: "owner",
            type: "uuid",
          },
          {
            name: "business",
            type: "uuid",
          },
          {
            name: "services",
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
            name: "OwnerKey",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["owner"],
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
            columnNames: ["services"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
