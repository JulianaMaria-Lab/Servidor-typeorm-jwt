import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669726405037 implements MigrationInterface {
    name = 'default1669726405037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departments" ("iddepartment" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(70) NOT NULL, CONSTRAINT "UQ_8681da666ad9699d568b3e91064" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "users" ("iduser" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(70) NOT NULL, "mail" varchar(70) NOT NULL, "password" varchar NOT NULL, "profile" varchar NOT NULL DEFAULT ('employee'), CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "departments"`);
    }

}
