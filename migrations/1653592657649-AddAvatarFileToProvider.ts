import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAvatarFileToProvider1653592657649 implements MigrationInterface {
    name = 'AddAvatarFileToProvider1653592657649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Provider" ADD "avatarFileId" uuid`);
        await queryRunner.query(`ALTER TABLE "Provider" ADD CONSTRAINT "UQ_8a29eedf018310bd734f99261ae" UNIQUE ("avatarFileId")`);
        await queryRunner.query(`ALTER TABLE "Provider" ADD CONSTRAINT "FK_8a29eedf018310bd734f99261ae" FOREIGN KEY ("avatarFileId") REFERENCES "File"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Provider" DROP CONSTRAINT "FK_8a29eedf018310bd734f99261ae"`);
        await queryRunner.query(`ALTER TABLE "Provider" DROP CONSTRAINT "UQ_8a29eedf018310bd734f99261ae"`);
        await queryRunner.query(`ALTER TABLE "Provider" DROP COLUMN "avatarFileId"`);
    }

}
