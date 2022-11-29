import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669727230085 implements MigrationInterface {
    name = 'default1669727230085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("iduser" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(70) NOT NULL, "mail" varchar(70) NOT NULL, "password" varchar NOT NULL, "profile" varchar NOT NULL DEFAULT ('employee'), "managerIduser" integer, CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("iduser", "name", "mail", "password", "profile") SELECT "iduser", "name", "mail", "password", "profile" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("iduser" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(70) NOT NULL, "mail" varchar(70) NOT NULL, "password" varchar NOT NULL, "profile" varchar NOT NULL DEFAULT ('employee'), "managerIduser" integer, CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"), CONSTRAINT "FK_d5673df333b38ef8a38699ffb49" FOREIGN KEY ("managerIduser") REFERENCES "users" ("iduser") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("iduser", "name", "mail", "password", "profile", "managerIduser") SELECT "iduser", "name", "mail", "password", "profile", "managerIduser" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("iduser" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(70) NOT NULL, "mail" varchar(70) NOT NULL, "password" varchar NOT NULL, "profile" varchar NOT NULL DEFAULT ('employee'), "managerIduser" integer, CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"))`);
        await queryRunner.query(`INSERT INTO "users"("iduser", "name", "mail", "password", "profile", "managerIduser") SELECT "iduser", "name", "mail", "password", "profile", "managerIduser" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("iduser" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(70) NOT NULL, "mail" varchar(70) NOT NULL, "password" varchar NOT NULL, "profile" varchar NOT NULL DEFAULT ('employee'), CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"))`);
        await queryRunner.query(`INSERT INTO "users"("iduser", "name", "mail", "password", "profile") SELECT "iduser", "name", "mail", "password", "profile" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
