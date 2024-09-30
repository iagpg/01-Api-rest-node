import type { FastifyReply, FastifyRequest } from "fastify"

export async function checkSessionIdExist(request: FastifyRequest,reply: FastifyReply){

    const sessionId = request.cookies.sessionId
    if (!sessionId) {
        return await reply.status(401).send({
            error:'Unauthorized.'
        })
    }
}