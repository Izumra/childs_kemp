import express from 'express'
import dotenv from 'dotenv'
import {Groute} from './middleware/Routes/Groute.js'
import cors from 'cors'
import session from 'express-session'
import { Redis } from 'ioredis'
import RedisStore from 'connect-redis'

dotenv.config()
const app=express()

export let RedisClient=null
if(process.env.NODEENV=='development'){
    app.use(session({
        secret:"Nk%jTWxMtP.1",
        saveUninitialized:false,
        resave:false,
        cookie:{
            secure:false,
            httpOnly:true,
            expires:true,
            maxAge:2*60*60*1000
        }
    }))
}
else{
    RedisClient=new Redis({host:'redis',port:6379})
    app.use(session({
        store:new RedisStore({client:RedisClient}),
        secret:"Nk%jTWxMtP.1",
        saveUninitialized:false,
        resave:false,
        cookie:{
            secure:false,
            httpOnly:true,
            expires:true,
            maxAge:2*60*60*1000
        }
    }))
}

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))
app.set('views','./public/views')
app.use(cors())
Groute(app)

app.listen(process.env.SERVERPORT,()=>console.log('Server was started on: http://localhost:'+process.env.SERVERPORT))