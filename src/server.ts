import { app } from "./app"


app.listen({port: Number(process.env.PORT) || 3000, host: ("RENDER" in process.env) ? '0.0.0.0' : 'localhost'}).then(() => {
	console.log('server running')
})
