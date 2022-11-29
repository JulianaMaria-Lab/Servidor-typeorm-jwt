import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669728377830 implements MigrationInterface {
    name = 'default1669728377830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_cd5c489b8c7f4f5c043180e405"`);
        await queryRunner.query(`DROP INDEX "IDX_fd8a80d801eedb3f15c2156fec"`);
        await queryRunner.query(`CREATE TABLE "temporary_works" ("iduser" integer NOT NULL, "departmentsIddepartment" integer NOT NULL, CONSTRAINT "FK_cd5c489b8c7f4f5c043180e405e" FOREIGN KEY ("iduser") REFERENCES "users" ("iduser") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("iduser", "departmentsIddepartment"))`);
        await queryRunner.query(`INSERT INTO "temporary_works"("iduser", "departmentsIddepartment") SELECT "iduser", "departmentsIddepartment" FROM "works"`);
        await queryRunner.query(`DROP TABLE "works"`);
        await queryRunner.query(`ALTER TABLE "temporary_works" RENAME TO "works"`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5c489b8c7f4f5c043180e405" ON "works" ("iduser") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd8a80d801eedb3f15c2156fec" ON "works" ("departmentsIddepartment") `);
        await queryRunner.query(`DROP INDEX "IDX_fd8a80d801eedb3f15c2156fec"`);
        await queryRunner.query(`DROP INDEX "IDX_cd5c489b8c7f4f5c043180e405"`);
        await queryRunner.query(`CREATE TABLE "temporary_works" ("iduser" integer NOT NULL, "iddepartment" integer NOT NULL, CONSTRAINT "FK_cd5c489b8c7f4f5c043180e405e" FOREIGN KEY ("iduser") REFERENCES "users" ("iduser") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("iduser", "iddepartment"))`);
        await queryRunner.query(`INSERT INTO "temporary_works"("iduser", "iddepartment") SELECT "iduser", "departmentsIddepartment" FROM "works"`);
        await queryRunner.query(`DROP TABLE "works"`);
        await queryRunner.query(`ALTER TABLE "temporary_works" RENAME TO "works"`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5c489b8c7f4f5c043180e405" ON "works" ("iduser") `);
        await queryRunner.query(`CREATE INDEX "IDX_55983d7c98dfbc4b487fd0ebb1" ON "works" ("iddepartment") `);
        await queryRunner.query(`DROP INDEX "IDX_cd5c489b8c7f4f5c043180e405"`);
        await queryRunner.query(`DROP INDEX "IDX_55983d7c98dfbc4b487fd0ebb1"`);
        await queryRunner.query(`CREATE TABLE "temporary_works" ("iduser" integer NOT NULL, "iddepartment" integer NOT NULL, CONSTRAINT "FK_cd5c489b8c7f4f5c043180e405e" FOREIGN KEY ("iduser") REFERENCES "users" ("iduser") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_55983d7c98dfbc4b487fd0ebb17" FOREIGN KEY ("iddepartment") REFERENCES "departments" ("iddepartment") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("iduser", "iddepartment"))`);
        await queryRunner.query(`INSERT INTO "temporary_works"("iduser", "iddepartment") SELECT "iduser", "iddepartment" FROM "works"`);
        await queryRunner.query(`DROP TABLE "works"`);
        await queryRunner.query(`ALTER TABLE "temporary_works" RENAME TO "works"`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5c489b8c7f4f5c043180e405" ON "works" ("iduser") `);
        await queryRunner.query(`CREATE INDEX "IDX_55983d7c98dfbc4b487fd0ebb1" ON "works" ("iddepartment") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_55983d7c98dfbc4b487fd0ebb1"`);
        await queryRunner.query(`DROP INDEX "IDX_cd5c489b8c7f4f5c043180e405"`);
        await queryRunner.query(`ALTER TABLE "works" RENAME TO "temporary_works"`);
        await queryRunner.query(`CREATE TABLE "works" ("iduser" integer NOT NULL, "iddepartment" integer NOT NULL, CONSTRAINT "FK_cd5c489b8c7f4f5c043180e405e" FOREIGN KEY ("iduser") REFERENCES "users" ("iduser") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("iduser", "iddepartment"))`);
        await queryRunner.query(`INSERT INTO "works"("iduser", "iddepartment") SELECT "iduser", "iddepartment" FROM "temporary_works"`);
        await queryRunner.query(`DROP TABLE "temporary_works"`);
        await queryRunner.query(`CREATE INDEX "IDX_55983d7c98dfbc4b487fd0ebb1" ON "works" ("iddepartment") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd5c489b8c7f4f5c043180e405" ON "works" ("iduser") `);
        await queryRunner.query(`DROP INDEX "IDX_55983d7c98dfbc4b487fd0ebb1"`);
        await queryRunner.query(`DROP INDEX "IDX_cd5c489b8c7f4f5c043180e405"`);
        await queryRunner.query(`ALTER TABLE "works" RENAME TO "temporary_works"`);
        await queryRunner.query(`CREATE TABLE "works" ("iduser" integer NOT NULL, "departmentsIddepartment" integer NOT NULL, CONSTRAINT "FK_cd5c489b8c7f4f5c043180e405e" FOREIGN KEY ("iduser") REFERENCES "users" ("iduser") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("iduser", "departmentsIddepartment"))`);
        await queryRunner.query(`INSERT INTO "works"("iduser", "departmentsIddepartment") SELECT "iduser", "iddepartment" FROM "temporary_works"`);
        await queryRunner.query(`DROP TABLE "temporary_works"`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5c489b8c7f4f5c043180e405" ON "works" ("iduser") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd8a80d801eedb3f15c2156fec" ON "works" ("departmentsIddepartment") `);
        await queryRunner.query(`DROP INDEX "IDX_fd8a80d801eedb3f15c2156fec"`);
        await queryRunner.query(`DROP INDEX "IDX_cd5c489b8c7f4f5c043180e405"`);
        await queryRunner.query(`ALTER TABLE "works" RENAME TO "temporary_works"`);
        await queryRunner.query(`CREATE TABLE "works" ("iduser" integer NOT NULL, "departmentsIddepartment" integer NOT NULL, CONSTRAINT "FK_cd5c489b8c7f4f5c043180e405e" FOREIGN KEY ("iduser") REFERENCES "users" ("iduser") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_fd8a80d801eedb3f15c2156fec5" FOREIGN KEY ("departmentsIddepartment") REFERENCES "departments" ("iddepartment") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("iduser", "departmentsIddepartment"))`);
        await queryRunner.query(`INSERT INTO "works"("iduser", "departmentsIddepartment") SELECT "iduser", "departmentsIddepartment" FROM "temporary_works"`);
        await queryRunner.query(`DROP TABLE "temporary_works"`);
        await queryRunner.query(`CREATE INDEX "IDX_fd8a80d801eedb3f15c2156fec" ON "works" ("departmentsIddepartment") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd5c489b8c7f4f5c043180e405" ON "works" ("iduser") `);
    }

}
