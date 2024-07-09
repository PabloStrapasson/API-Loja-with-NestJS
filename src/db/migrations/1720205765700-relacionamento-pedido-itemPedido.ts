import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacionamentoPedidoItemPedido1720205765700
  implements MigrationInterface
{
  name = 'RelacionamentoPedidoItemPedido1720205765700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "itens_pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedidoId" uuid, CONSTRAINT "PK_34ba752329a604381e367c431ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" ADD CONSTRAINT "FK_ab2b96858c45196d22cce672215" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP CONSTRAINT "FK_ab2b96858c45196d22cce672215"`,
    );
    await queryRunner.query(`DROP TABLE "itens_pedido"`);
  }
}
