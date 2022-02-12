import { MigrationInterface, QueryRunner } from 'typeorm'

export class CoffeeRefactor1644542896830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALERT TABLE "Coffee" RENAME COLUMN "name" to "title"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALERT TABLE "Coffee" RENAME COLUMN "title" to "name"`,
    )
  }
}
