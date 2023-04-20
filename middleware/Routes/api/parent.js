import express from 'express'

const route=express.Router()

route.get('/',(req,res)=>{
    res.json('Это конечная точка для обработки запросов в кабинете родителя')
})

export default route