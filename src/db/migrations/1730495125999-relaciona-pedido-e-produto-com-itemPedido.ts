import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaPedidoEProdutoComItemPedido1730495125999 implements MigrationInterface {
    name = 'RelacionaPedidoEProdutoComItemPedido1730495125999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_pedido_entity" DROP CONSTRAINT "FK_aff307c4d1223bef333d7840a2d"`);
        await queryRunner.query(`ALTER TABLE "item_pedido_entity" ADD CONSTRAINT "FK_aff307c4d1223bef333d7840a2d" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_pedido_entity" DROP CONSTRAINT "FK_aff307c4d1223bef333d7840a2d"`);
        await queryRunner.query(`ALTER TABLE "item_pedido_entity" ADD CONSTRAINT "FK_aff307c4d1223bef333d7840a2d" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
