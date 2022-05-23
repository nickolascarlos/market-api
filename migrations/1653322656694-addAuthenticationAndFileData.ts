import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAuthenticationAndFileData1653322656694
  implements MigrationInterface
{
  name = 'addAuthenticationAndFileData1653322656694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Authentication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "ip" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_e69ed6b26bbd660bebdfa4a8127" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "File" ADD "data" bytea NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "File" DROP CONSTRAINT "PK_b287aa0a177c20740f3d917e38f"`,
    );
    await queryRunner.query(`ALTER TABLE "File" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "File" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "File" ADD CONSTRAINT "PK_b287aa0a177c20740f3d917e38f" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "File" DROP CONSTRAINT "PK_b287aa0a177c20740f3d917e38f"`,
    );
    await queryRunner.query(`ALTER TABLE "File" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "File" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "File" ADD CONSTRAINT "PK_b287aa0a177c20740f3d917e38f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "File" DROP COLUMN "data"`);
    await queryRunner.query(`DROP TABLE "Authentication"`);
  }
}