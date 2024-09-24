import fastify from "fastify"

import { knex } from "./database"
import { env } from "./env"
//import crypto from 'node:crypto'

const app = fastify()

app.get("/hello", async () => {
	// const table = await knex('sqlite_schema').select('*')
	// return table
	// const transaction = await knex('transactions').insert({
	// 	id: crypto.randomUUID(),
	// 	title: 'Transação de teste',
	// 	amount: 629.5,

	// }).returning('*')
 const transaction = await knex('transactions').where('amount','>=',500).select('*').returning('*')
 console.log(transaction)
	return transaction
})

app.listen({port: env.PORT}).then(() => {
	console.log('server running')
})
