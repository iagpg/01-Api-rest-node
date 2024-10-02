import type { FastifyInstance } from "fastify"

import {z} from 'zod'
import { knex } from "../database"
import { checkSessionIdExist } from "../middlewares/verify-SessionId-Exist"
import {randomUUID} from 'node:crypto'


const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    amount: z.number(),
    on_diet: z.boolean()
})

export async function mealsRoutes(app: FastifyInstance){ 
    //triggers for all requests inside the plugin
     app.addHook('preHandler', checkSessionIdExist)
    // list all meals
    app.get('/', async (request)=>{

        const {sessionId} = request.cookies

        const meals = await knex('meals').where('session_id',sessionId).returning('*')
        return {meals}
    })

    // list especifically meals
    app.get('/:id', async (request)=>{
        const getRequestParamsSchema = z.object({
            id: z.string().uuid()
        })

        const {id} = getRequestParamsSchema.parse(request.params)
        const {sessionId} = request.cookies


        const meals = await knex('meals').where({id, 'session_id': sessionId}).first().returning('*')
        return {meals}
    })

    //delete a meal
    app.delete('/:id', async (request)=>{
        const getRequestParamsSchema = z.object({
            id: z.string().uuid()
        })

        const {id} = getRequestParamsSchema.parse(request.params)
        const {sessionId} = request.cookies


        const meals = await knex('meals').where({id, 'session_id': sessionId}).del()
        return {meals}
    })

    // summary
    app.get('/summary', async (request)=>{
        const {sessionId} = request.cookies
        
        
        const createSummarySchema = z.object({
            totalOnDiet: z.number().default(0),
            totalOffDiet: z.number().default(0),
            totalAmountOnDiet: z.number().default(0),
            totalAmountOffDiet: z.number().default(0),
            totalAmount: z.number().default(0),

        })
        
        const totalMeals = await knex('meals').where('session_id',sessionId).orderBy('created_at', 'desc')

        const summary =  await knex('meals').where('session_id',sessionId).select(
            knex.raw('COALESCE(SUM(CASE WHEN on_diet = 0 THEN 1 ELSE 0 END), 0) AS "totalOnDiet"'), 
            knex.raw('COALESCE(SUM(CASE WHEN on_diet = 1 THEN 1 ELSE 0 END), 0) AS "totalOffDiet"'),
            knex.raw('COALESCE(SUM(CASE WHEN on_diet = 1 THEN amount ELSE 0 END), 0) AS "totalAmountOnDiet"'),
            knex.raw('COALESCE(SUM(CASE WHEN on_diet = 0 THEN amount ELSE 0 END), 0) AS "totalAmountOffDiet"'),
            knex.sum('amount').as('totalAmount')
        ).first()


        const {bestSequence} = totalMeals.reduce((newT,meal)=>{
            if(meal.on_diet) {
                newT.currentSequence += 1
            }else{
                newT.currentSequence = 0
            }
            if(newT.currentSequence > newT.bestSequence){
                newT.bestSequence = newT.currentSequence
            }
            return newT

        },{currentSequence:0,bestSequence:0})


        const {totalOnDiet,totalOffDiet,totalAmountOnDiet,totalAmountOffDiet,totalAmount} = createSummarySchema.parse(summary)
        
        return {summary:{
            total_Meals: totalMeals.length,
            total_Meals_On_Diet: totalOnDiet,
            total_Meals_Off_Diet: totalOffDiet,
            bestSequence,
            total_expenses:{
                totalAmountOnDiet,
                totalAmountOffDiet,
                totalAmount
            }
        }}
    })

    app.post("/", async (request,rep) => {
        
        const {sessionId} = request.cookies
        console.log(request.body)
        const {name,description,on_diet,amount} = createMealBodySchema.parse(request.body)

    
        const createMeal = {
            id: randomUUID(),
            name,
            description,
            amount,
            on_diet,
            session_id: sessionId
          }
          
        await knex('meals').insert(createMeal)
        return rep.status(201).send()
        })
}