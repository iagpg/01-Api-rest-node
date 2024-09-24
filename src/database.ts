import 'dotenv/config'
import { knex as setupKnex, type Knex } from 'knex'
import { env } from './env'



export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3', 
    connection: {
      filename: env.DATABASE_URL
    },
    migrations: {
      directory: './db/migrations',
      extension:'ts'
    },
    useNullAsDefault: true, 
  },
}


export const knex = setupKnex(config.development)
