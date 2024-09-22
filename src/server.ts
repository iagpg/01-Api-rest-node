import fastify from "fastify"
import { knex } from "./database"

const app = fastify()

app.get("/hello", async () => {
	const table = await knex('sqlite_schema').select('*')
	return table

})

app.listen({ port: 3000 }).then(() => {
	console.log('server running')
})
