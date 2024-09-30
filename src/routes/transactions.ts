import type { FastifyInstance } from "fastify"

import {z} from 'zod'
import {randomUUID} from 'node:crypto'
import { knex } from "../database"
import { checkSessionIdExist } from "../middlewares/verify-SessionId-Exist"


const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(['credit','debit']).optional(),


})
export async function transactionsRoutes(app: FastifyInstance){ 
    //triggers for all requests inside the plugin
    // app.addHook('preHandler',async (request)=>{
    //     console.log(`${request.method}`)
    // })
    // list all transactions
    app.get('/',{
        preHandler: [checkSessionIdExist]

    }, async (request)=>{

        const {sessionId} = request.cookies

        const transactions = await knex('transactions').where('session_id',sessionId).returning('*')
        return {transactions}
    })

    // list especifically transactions
    app.get('/:id',{
        preHandler: [checkSessionIdExist]

    }, async (request)=>{
        const getRequestParamsSchema = z.object({
            id: z.string().uuid()
        })

        const {id} = getRequestParamsSchema.parse(request.params)
        const {sessionId} = request.cookies


        const transactions = await knex('transactions').where({id, 'session_id': sessionId}).first().returning('*')
        return {transactions}
    })

    // summary
    app.get('/summary', {
        preHandler: [checkSessionIdExist]

    }, async (request)=>{
        const {sessionId} = request.cookies


        const summary =  await knex('transactions').where('session_id',sessionId).sum('amount',{as:'amount'}).first()
        return {summary}
    })


    
    //create transaction
    app.post("/", async (request,rep) => {
        
        
    const {title,amount,type} = createTransactionBodySchema.parse(request.body)
        
    let sessionId = request.cookies.sessionId
    if(!sessionId) {
        sessionId = randomUUID()
        rep.cookie('sessionId',sessionId,{
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

    }
    console.log(request.cookies)

    const transaction = {
        id: randomUUID(),
        title,
        amount: type === "credit" ? amount : amount * -1,
      }
      
    await knex('transactions').insert(transaction)
    return rep.status(201).send()
    })
}