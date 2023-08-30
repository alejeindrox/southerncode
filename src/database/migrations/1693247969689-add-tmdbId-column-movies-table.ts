import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTmdbIdColumnMoviesTable1693247969689
  implements MigrationInterface
{
  name = 'AddTmdbIdColumnMoviesTable1693247969689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ADD "tmdbId" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "tmdbId"`);
  }
}
