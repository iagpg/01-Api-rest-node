import type { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
    await knex.schema.renameTable('transactions', 'meals')
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.renameTable('meals', 'transactions')
}

