import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditColumns1746724309332 implements MigrationInterface {
    name = 'AddAuditColumns1746724309332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "menu_category" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_category" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_category" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "menu_category" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "menu_category" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "archived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "menu_category" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "menu_category" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "menu_category" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "menu_category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_category" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "archived"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "isActive" boolean NOT NULL`);
    }

}
