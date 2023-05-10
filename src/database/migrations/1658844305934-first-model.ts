import {MigrationInterface, QueryRunner} from "typeorm";

export class firstModel1658844305934 implements MigrationInterface {
    name = 'firstModel1658844305934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audiences" DROP CONSTRAINT "FK_1861169621f1bd939fd733969e8"`);
        await queryRunner.query(`ALTER TABLE "audiences" DROP CONSTRAINT "UQ_1861169621f1bd939fd733969e8"`);
        await queryRunner.query(`ALTER TABLE "audiences" ADD CONSTRAINT "FK_1861169621f1bd939fd733969e8" FOREIGN KEY ("user_assign") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audiences" DROP CONSTRAINT "FK_1861169621f1bd939fd733969e8"`);
        await queryRunner.query(`ALTER TABLE "audiences" ADD CONSTRAINT "UQ_1861169621f1bd939fd733969e8" UNIQUE ("user_assign")`);
        await queryRunner.query(`ALTER TABLE "audiences" ADD CONSTRAINT "FK_1861169621f1bd939fd733969e8" FOREIGN KEY ("user_assign") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
