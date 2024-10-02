import type { FastifyReply, FastifyRequest } from "fastify"
import {z} from 'zod'

const createTransactionBodySchema = z.object({
    name: z.string(),
    email: z.string().email()


})

export async function checkNameAndEmail(request: FastifyRequest,reply: FastifyReply){

    const informationProvided = createTransactionBodySchema.safeParse(request.body)
    
    if (!informationProvided.success){
        return await reply.status(400).send({error: "name or email not provided"})
    }

}