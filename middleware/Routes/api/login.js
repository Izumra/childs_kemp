import express from 'express'
import { sendRequest } from '../../functions/connecter.js'

const route=express.Router()

route.post('/',express.json(),async(req,res)=>{
    if(req.body&&req.body.password&&(req.body.email||req.body.tel_number)){
        let user=null
        if(req.body.email)user=await sendRequest(`SELECT * FROM develop.parent WHERE mail=$1`,[req.body.email])
        else user=await sendRequest(`SELECT * FROM develop.parent WHERE tel_number=$1`,[req.body.tel_number])

        if(user&&user.length){
            if(user[0].password==req.body.password){
                let passport=await sendRequest('SELECT * FROM develop.passport WHERE id_passport=$1',[user[0].id_passport])
                let registration=null
                let factRegistration=null
                if(user[0].id_registration==user[0].id_factical_registration){
                    registration=await sendRequest('SELECT * FROM develop.registration WHERE id_registration=$1',[user[0].id_registration])
                }
                else{
                    registration=await sendRequest('SELECT * FROM develop.registration WHERE id_registration=$1',[user[0].id_registration])
                    factRegistration=await sendRequest('SELECT * FROM develop.registration WHERE id_registration=$1',[user[0].id_factical_registration])
                }
                req.session.user=user[0]
                req.session.passport=passport&&passport.length>0?passport[0]:''
                req.session.registration=registration&&registration.length>0?registration[0]:''
                req.session.factRegistration=factRegistration&&factRegistration.length>0?factRegistration[0]:''
                res.status(200).json({session:req.session.id,user:user[0],passport:passport&&passport.length>0?passport[0]:'',registration:registration&&registration.length>0?registration[0]:'',factRegistration:factRegistration&&factRegistration.length>0?factRegistration[0]:''})
            }
            else res.status(400).json('Пароль пользователя неверен')
        }
        else if(user&&user.length==0){
            let organization=null
            if(req.body.email)organization=await sendRequest('SELECT * FROM develop.organization WHERE email=$1',[req.body.email])
            else organization=await sendRequest(`SELECT * FROM develop.organization WHERE tel_number=$1`,[req.body.tel_number])

            if(organization&&organization.length){
                if(organization[0].password==req.body.password){
                    req.session.organization=organization[0]
                    res.status(200).json({session:req.session.id,organization:organization[0]})
                }
                else res.status(400).json('Пароль организации неверен')
            }
            else res.status(404).json('Организация не была найдена')
        }
        else res.status(404).json('Пользователь или организация не были найдены')
    }
    else res.status(400).json('Не было передано тело запроса или обязательных данных')
})

export default route