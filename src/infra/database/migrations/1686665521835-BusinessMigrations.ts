// import tr from "date-fns/locale/tr";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class BusinessMigrations1686665521835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "business",
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
            name: "appointments",
            type: "uuid",
            isArray: true,
          },
          {
            name: "categories",
            type: "uuid",
            isArray: true,
          },
          {
            name: "user",
            type: "uuid",
          },
          {
            name: "services",
            type: "uuid",
            isArray: true,
          },
          {
            name: "professionals",
            type: "uuid",
            isArray: true,
          },
          {
            name: "expediencys",
            type: "uuid",
            isArray: true,
          },
          {
            name: "blockings",
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
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "CategoriesKey",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["categories"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "ServicesKey",
            referencedTableName: "services",
            referencedColumnNames: ["id"],
            columnNames: ["services"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "ProfessionalsKey",
            referencedTableName: "professionals",
            referencedColumnNames: ["id"],
            columnNames: ["professionals"],
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
          {
            name: "BlockingsKey",
            referencedTableName: "blockings",
            referencedColumnNames: ["id"],
            columnNames: ["blockings"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("business");
  }
}
