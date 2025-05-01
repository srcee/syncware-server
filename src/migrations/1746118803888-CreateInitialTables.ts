import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1746118803888 implements MigrationInterface {
  name = 'CreateInitialTables1746118803888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."restaurant_table_status_enum" AS ENUM('available', 'occupied', 'reserved')`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant_table" ("id" SERIAL NOT NULL, "tableNumber" character varying NOT NULL, "seats" integer NOT NULL, "status" "public"."restaurant_table_status_enum" NOT NULL, "restaurantId" integer, CONSTRAINT "PK_3e32a2ab3947c142effeb972a63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'manager', 'waiter', 'chef', 'bartender')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, "restaurantId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "organizationId" integer, CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "price" numeric NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "preparationArea" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "restaurantId" integer, CONSTRAINT "PK_246dfbfa0f3b0a4e953f7490544" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_item_status_enum" AS ENUM('queued', 'preparing', 'ready', 'delivered')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "notes" character varying, "status" "public"."order_item_status_enum" NOT NULL, "orderId" integer, "menuItemId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "tableId" integer, "waiterId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_table" ADD CONSTRAINT "FK_263f26ff823cdb9cac2ae508ab6" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_65b1b155df8d445c401c0d04278" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_87c75410f0dc4439ad05a061af7" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" ADD CONSTRAINT "FK_4af7d3076242d526641d4443d79" FOREIGN KEY ("categoryId") REFERENCES "menu_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_category" ADD CONSTRAINT "FK_4f1d952339a20edaa4164e4bf70" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_caa901372ba1b5aa30d1950b458" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_a9757413db9333d4bb21a2a42aa" FOREIGN KEY ("tableId") REFERENCES "restaurant_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_499bf32be632603e72979dc52f5" FOREIGN KEY ("waiterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_499bf32be632603e72979dc52f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_a9757413db9333d4bb21a2a42aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_caa901372ba1b5aa30d1950b458"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_category" DROP CONSTRAINT "FK_4f1d952339a20edaa4164e4bf70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" DROP CONSTRAINT "FK_4af7d3076242d526641d4443d79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_87c75410f0dc4439ad05a061af7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_65b1b155df8d445c401c0d04278"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_table" DROP CONSTRAINT "FK_263f26ff823cdb9cac2ae508ab6"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "order_item"`);
    await queryRunner.query(`DROP TYPE "public"."order_item_status_enum"`);
    await queryRunner.query(`DROP TABLE "menu_category"`);
    await queryRunner.query(`DROP TABLE "menu_item"`);
    await queryRunner.query(`DROP TABLE "restaurant"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "restaurant_table"`);
    await queryRunner.query(
      `DROP TYPE "public"."restaurant_table_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "organization"`);
  }
}
