import express from 'express'
import { sendRequest } from '../../functions/connecter.js'
import {getLinkFile} from '../../functions/YOSfunctions.js'

const route=express.Router()

route.get('/',async(req,res)=>{
    let kemps=await sendRequest('SELECT * FROM develop.organization')
    if(kemps&&kemps.length>0){
        for(let i=0;i<kemps.length;i++){
            if(kemps[i].avatar!='')kemps[i].avatar=await getLinkFile(kemps[i].avatar)
        }
        res.status(200).json(kemps)
    }
    else res.status(404).json('Не было найдено ни одного детского лагеря')
})

export default route