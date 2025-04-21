import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ServiceMigration1707671116229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "services",
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
            name: "price",
            type: "varchar",
          },
          {
            name: "duration",
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
            name: "averageRating",
            type: "int",
            default: 0,
          },
          {
            name: "totalRatings",
            type: "int",
            default: 0,
          },
          {
            name: "totalValueRating",
            type: "int",
            default: 0,
          },
          {
            name: "appointments",
            type: "uuid",
            isArray: true,
          },
          {
            name: "business",
            type: "uuid",
          },
          {
            name: "categories",
            type: "uuid",
            isArray: true,
          },
          {
            name: "ratings",
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
            onDelete: "CASCADE",
          },
          {
            name: "CategoriesKey",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["categories"],
          },
          {
            name: "RatingsKey",
            referencedTableName: "ratings",
            referencedColumnNames: ["id"],
            columnNames: ["ratings"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("services");
  }
}
