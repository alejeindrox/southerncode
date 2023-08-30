import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyIndexColumnMoviesTable1693281932146
  implements MigrationInterface
{
  name = 'ModifyIndexColumnMoviesTable1693281932146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5aa0bbd146c0082d3fc5a0ad5d"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e9d4a90d2d6a56fd9f9300c937" ON "movies" ("tmdbId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e9d4a90d2d6a56fd9f9300c937"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5aa0bbd146c0082d3fc5a0ad5d" ON "movies" ("title") `,
    );
  }
}
