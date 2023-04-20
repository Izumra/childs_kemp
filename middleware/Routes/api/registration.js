import express from 'express'
import { sendRequest } from '../../functions/connecter.js'

const route=express.Router()

route.post('/',express.json(),async (req,res)=>{
    if(req.body&&req.body.password&&(req.body.email||req.body.tel_number)&&req.body.FIO&&req.body.date_of_birthday){
        if(req.body.email){
            await sendRequest('INSERT INTO develop.parent(FIO,date_of_birthday,mail,password,id_passport,id_registration,id_factical_registration,tel_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[req.body.FIO,req.body.date_of_birthday,req.body.email,req.body.password,1,1,1,''])
        }
        else if(req.body.tel_number){
            await sendRequest('INSERT INTO develop.parent(FIO,date_of_birthday,tel_number,password,id_passport,id_registration,id_factical_registration,mail) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[req.body.FIO,req.body.date_of_birthday,req.body.tel_number,req.body.password,1,1,1,''])
        }
        let user=await sendRequest('SELECT * FROM develop.parent WHERE FIO=$1',[req.body.FIO])
        if(user&&user.length>0){
            req.session.user=user[0]
            res.status(200).json({session:req.session.id,user:user[0]})
        }
        else res.status(404).json('Пользователь не зарегестрирован в системе')
    }
    else if(req.body&&req.body.password&&(req.body.email||req.body.tel_number)&&req.body.title){
        if(req.body.email){
            await sendRequest('INSERT INTO develop.organization(title,email,password,tel_number) VALUES($1,$2,$3,$4)',[req.body.title,req.body.email,req.body.password,''])
        }
        else if(req.body.tel_number){
            await sendRequest('INSERT INTO develop.organization(title,email,password,tel_number) VALUES($1,$2,$3,$4)',[req.body.title,'',req.body.password,req.body.tel_number])
        }
        let organization=await sendRequest('SELECT * FROM develop.organization WHERE title=$1',[req.body.title])
        if(organization&&organization.length>0){
            req.session.organization=organization[0]
            res.status(200).json({session:req.session.id,organization:organization[0]})
        }
        else res.status(404).json('Организация не зарегестрирована в системе')
    }
    else res.status(400).json('Не все обязательные параметры были переданы, или тело запроса было пустое')
})

export default route