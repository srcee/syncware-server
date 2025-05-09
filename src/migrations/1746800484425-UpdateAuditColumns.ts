import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuditColumns1746800484425 implements MigrationInterface {
    name = 'UpdateAuditColumns1746800484425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_d6e163bd2cfdd79045d0a95d94d" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_ed73e18ffea3c5e2699a5b3b192" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD CONSTRAINT "FK_5f5bd51e887ab3fe5f828f262e2" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD CONSTRAINT "FK_d95287b24bfc53adec4272138a2" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_49788ff70c36810872a550ccae0" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_f9a7a611606954b809b9937c2f7" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_82319f64187836b307e6d6ba08d" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a19025a009be58684a63961aaf3" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_category" ADD CONSTRAINT "FK_c077cf7d4ed3dd115eeffaf87fe" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_category" ADD CONSTRAINT "FK_fadcf10ed6264ff6100b80a2d02" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_bb6e4d306c019df594a6ac8444b" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_baab1b94636ef6abdf024dd2ef5" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_2a142cd65f2cffe2d70de14ff36" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_fa6a675e30b3b9e71a9388bf288" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_345801c2d250d9eb1d27e0099b9" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_47c50b09a30fdbbc3f9e2f2cbf4" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_47c50b09a30fdbbc3f9e2f2cbf4"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_345801c2d250d9eb1d27e0099b9"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_fa6a675e30b3b9e71a9388bf288"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_2a142cd65f2cffe2d70de14ff36"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_baab1b94636ef6abdf024dd2ef5"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_bb6e4d306c019df594a6ac8444b"`);
        await queryRunner.query(`ALTER TABLE "menu_category" DROP CONSTRAINT "FK_fadcf10ed6264ff6100b80a2d02"`);
        await queryRunner.query(`ALTER TABLE "menu_category" DROP CONSTRAINT "FK_c077cf7d4ed3dd115eeffaf87fe"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a19025a009be58684a63961aaf3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_82319f64187836b307e6d6ba08d"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_f9a7a611606954b809b9937c2f7"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_49788ff70c36810872a550ccae0"`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP CONSTRAINT "FK_d95287b24bfc53adec4272138a2"`);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP CONSTRAINT "FK_5f5bd51e887ab3fe5f828f262e2"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_ed73e18ffea3c5e2699a5b3b192"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_d6e163bd2cfdd79045d0a95d94d"`);
    }

}
