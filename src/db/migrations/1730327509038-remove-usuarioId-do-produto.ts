import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUsuarioIdDoProduto1730327509038 implements MigrationInterface {
    name = 'RemoveUsuarioIdDoProduto1730327509038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "usuario_id" character varying(100)`);
    }

}
