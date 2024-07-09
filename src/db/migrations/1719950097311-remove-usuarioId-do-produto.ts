import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUsuarioIdDoProduto1719950097311
  implements MigrationInterface
{
  name = 'RemoveUsuarioIdDoProduto1719950097311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "usuario_id" character varying(100)`,
    );
  }
}
