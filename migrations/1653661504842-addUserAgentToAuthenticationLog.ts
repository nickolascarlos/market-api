import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserAgentToAuthenticationLog1653661504842 implements MigrationInterface {
    name = 'addUserAgentToAuthenticationLog1653661504842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication" ADD "userAgent" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication" DROP COLUMN "userAgent"`);
    }

}
