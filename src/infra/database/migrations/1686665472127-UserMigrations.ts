import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigrations1686665472127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generated_v4",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "cpfcnpj",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
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
          {
            name: "users_roles",
            type: "uuid",
          },
          {
            name: "users_permissions",
            type: "uuid",
          },
          {
            name: "business_id",
            type: "uuid",
          },
          {
            name: "professional_id",
            type: "uuid",
          },
          {
            name: "plan_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "RolesUser",
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            columnNames: ["users_roles"],
          },
          {
            name: "PermissionsUser",
            referencedTableName: "permissions",
            referencedColumnNames: ["id"],
            columnNames: ["users_permissions"],
          },
          {
            name: "ProfessionalUser",
            referencedTableName: "professional",
            referencedColumnNames: ["id"],
            columnNames: ["professional_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "PlanUser",
            referencedTableName: "plan",
            referencedColumnNames: ["id"],
            columnNames: ["plan_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
