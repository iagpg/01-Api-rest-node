import type { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('meals',(table)=>{
        table.renameColumn('title','name')
        table.boolean('on_diet').defaultTo(true).notNullable()
        //table.dropColumn('session_id') foreign key de users

       
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('meals',(table)=>{
        table.renameColumn('name','title')
        table.dropColumn('on_diet')
        
       
    })
}

