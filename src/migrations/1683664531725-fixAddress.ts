import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAddress1683664531725 implements MigrationInterface {
    name = 'FixAddress1683664531725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_44ae17efa35575b6a6f83b35ee"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_44ae17efa35575b6a6f83b35ee" ON "real_estate" ("addressId") `);
    }

}
