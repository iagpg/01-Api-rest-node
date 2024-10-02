import type { FastifyInstance } from "fastify"
import {z} from 'zod'

import {randomUUID} from 'node:crypto'
import { knex } from "../database"
import { checkNameAndEmail } from "../middlewares/verify-user-and-name-provided"


const createTransactionBodySchema = z.object({
    name: z.string(),
    email: z.string().email()
})

export async function usersRoutes(app: FastifyInstance){ 
   
     app.addHook('preHandler',checkNameAndEmail)
   
    //create account
    app.post("/", async (request,rep) => {
    
    const {name,email} = createTransactionBodySchema.parse(request.body)
        
    let sessionId = request.cookies.sessionId
    if(!sessionId) {
        sessionId = randomUUID()
        rep.cookie('sessionId',sessionId,{
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

    }else{
        return rep.status(400).send({error: 'Account already exist'})
    }

    const createUser = {
        id: randomUUID(),
        name,
        email,
        session_id: sessionId
      }
      
    await knex('users').insert(createUser)
    return rep.status(201).send()
    })
}