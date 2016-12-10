import express from 'express'
import Mozaik  from 'mozaik'
import config  from '../config'
//import EXT_NAME  from 'mozaik-ext-EXT_NAME/client'


const forceSSL = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }

    return next()
}


const mozaik = new Mozaik(config);
//mozaik.bus.registerApi('EXT_NAME', EXT_NAME)


const app    = express()
const useSSL = process.env.USE_SSL === 'true'
if (useSSL) {
    app.use(forceSSL)
}
mozaik.startServer(app)


export default mozaik
