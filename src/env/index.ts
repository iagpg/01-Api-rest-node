import {config} from 'dotenv'
import { z } from 'zod'


if (process.env.NODE_ENV === 'test'){
    config({path: '.env.test'})
    console.log('application mode:',process.env.NODE_ENV)
    console.log('database: ',process.env.DATABASE_URL)
}else{
    config() // .env
}

const envSchema = z.object({
    NODE_ENV: z.enum(['development','test','production']).default('production'),
    DATABASE_URL: z.string(),
    DATABASE_CLIENT: z.enum(['sqlite','pg']),
    PORT: z.coerce.number().default(3000)

})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
    console.error('⚠️ variable not defined:',_env.error.format())
    throw new Error('environment variables not defined')
}

export const env = _env.data