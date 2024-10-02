
// eslint-disable-next-line
import {Knex} from 'knex'

declare module 'knex/types/tables' {
    export interface Tables {
        meals: {
        id: string,
        name: string,
        amount: number,
        on_diet: boolean,
        session_id?: string,
        created_at: string
        },
        users:{
            name: string,
            email: string
        }
    }
}