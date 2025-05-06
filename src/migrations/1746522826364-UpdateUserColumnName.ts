import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746522826364 implements MigrationInterface {
  name = 'Migrations1746522826364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "name" TO "username"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "username" TO "name"`,
    );
  }
}
