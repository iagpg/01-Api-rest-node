import {it,expect, beforeAll, afterAll, beforeEach,describe } from 'vitest'
import {app} from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Transactions Routes',()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    
    afterAll(async ()=>{
        await app.close()
    })

    beforeEach(()=>{
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })
    
    it('should create a new transaction', async ()=>{
        await request(app.server).post('/transactions').send({
            title: 'New Transaction',
            amount: 1000,
            type:'credit'
        }).expect(201)
        
    })
    
    it('should be able to find a especific transaction', async ()=>{
        const transactionCreation = await request(app.server).post('/transactions').send({
            title: 'New Transaction',
            amount: 1000,
            type:'credit'
        })

        const cookies = transactionCreation.get('set-cookie')
        
        if (!cookies){
            expect.fail('cookies not provided')
        }

         const listAllTransactionsResponse = await request(app.server)
        .get('/transactions').set('Cookie', cookies).expect(200)
        
        const transactionId = listAllTransactionsResponse.body.transactions[0].id

        await request(app.server).get(`/transactions/${transactionId}`).set("Cookie",cookies).expect(200)
        
    })

    it('should list all transactions',async ()=>{
        const transactionCreation = await request(app.server).post('/transactions').send({
            title: 'New Transaction',
            amount: 1000,
            type:'credit'
        })

        const cookies = transactionCreation.get('set-cookie')
        
        if (!cookies){
            expect.fail('cookies not provided')
        }

         const listAllTransactionsResponse = await request(app.server)
        .get('/transactions').set('Cookie', cookies).expect(200)

        expect(listAllTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New Transaction',
                amount: 1000,
            })
        ])
        
    })

    it('should sum all payments',async ()=>{

        const transactionCreation = await request(app.server).post('/transactions').send({
            title: 'New Transaction',
            amount: 5000,
            type:'credit'
        })

        const cookies = transactionCreation.get('set-cookie')
        
        if (!cookies){
            expect.fail('cookies not provided')
        }

       await request(app.server).post('/transactions').set('Cookie',cookies).send({
            title: 'New Transaction',
            amount: 2000,
            type:'debit'
        })

        const summaryResponse = await request(app.server).get('/transactions/summary').set('Cookie',cookies).expect(200)
        
        expect(summaryResponse.body.summary).toEqual({
            amount: 3000
        })
    })


})