import {MigrationInterface, QueryRunner} from "typeorm";

export class addAvatarFileId1653340268112 implements MigrationInterface {
    name = 'addAvatarFileId1653340268112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "avatarFileId" uuid`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_45344ea752a59d82203ce5d96fc" UNIQUE ("avatarFileId")`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_45344ea752a59d82203ce5d96fc" FOREIGN KEY ("avatarFileId") REFERENCES "File"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_45344ea752a59d82203ce5d96fc"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_45344ea752a59d82203ce5d96fc"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "avatarFileId"`);
    }

}
