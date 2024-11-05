import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraNomeDaTabelaItemPedido1730823226072 implements MigrationInterface {
    name = 'AlteraNomeDaTabelaItemPedido1730823226072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itens_pedido " ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedidoId" uuid, "produtoId" uuid, CONSTRAINT "PK_87fd0864b8d1e26fb565ec471b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itens_pedido " ADD CONSTRAINT "FK_f6068e9108e6041c879fd9027a1" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itens_pedido " ADD CONSTRAINT "FK_e6550acf1dcccb770cffe1e0b40" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedido " DROP CONSTRAINT "FK_e6550acf1dcccb770cffe1e0b40"`);
        await queryRunner.query(`ALTER TABLE "itens_pedido " DROP CONSTRAINT "FK_f6068e9108e6041c879fd9027a1"`);
        await queryRunner.query(`DROP TABLE "itens_pedido "`);
    }

}
