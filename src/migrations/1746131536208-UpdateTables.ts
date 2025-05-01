import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTables1746131536208 implements MigrationInterface {
  name = 'UpdateTables1746131536208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_table" RENAME COLUMN "tableNumber" TO "tableName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" DROP COLUMN "preparationArea"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."menu_item_preparationarea_enum" AS ENUM('Bar', 'Kitchen')`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" ADD "preparationArea" "public"."menu_item_preparationarea_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."order_status_enum" AS ENUM('Pending', 'Confirmed', 'InProgress', 'Completed', 'Cancelled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" "public"."order_status_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" character varying NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" DROP COLUMN "preparationArea"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."menu_item_preparationarea_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" ADD "preparationArea" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_table" RENAME COLUMN "tableName" TO "tableNumber"`,
    );
  }
}
