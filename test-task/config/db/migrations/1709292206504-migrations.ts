import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1709292206504 implements MigrationInterface {
    name = 'Migrations1709292206504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "etherscan_transactions" (
                "hash" character varying NOT NULL,
                "block_number" numeric NOT NULL,
                "from" character varying,
                "to" character varying,
                "value" numeric NOT NULL,
                CONSTRAINT "PK_60af8383adae2f4c88df2ba8a17" PRIMARY KEY ("hash")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "etherscan_transactions"
        `);
    }

}
