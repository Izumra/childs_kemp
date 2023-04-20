import loginAPI from './api/login.js'
import regAPI from './api/registration.js'
import kempsAPI from './api/kemps.js'
import parentAPI from './api/parent.js'

export const Groute=(app)=>{
    app.use('/api/login',loginAPI)
    app.use('/api/registration',regAPI)
    app.use('/api/kemps',kempsAPI)
    app.use('/api/parent',parentAPI)
}