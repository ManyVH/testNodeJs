import express from 'express'
import crypto from 'crypto'
import rutas from './routes/rutas.js'
import dotenv from "dotenv"
import {db} from './configs/db.js'
dotenv.config({path:'.env'})

const app = express();
const port = 3000;



// Middleware para validar headers
const validarHeaders = (req, res, next) => {
    const xDate = req.headers['x-date'];
    const xSignature = req.headers['x-signature'];
    const xAuthentication = req.headers['x-authentication'];
    const urlOrigen = req.path;
    console.log(xDate+"  " + xSignature +"   "+ xAuthentication + "  "+ urlOrigen)
    if (!xDate || !xSignature || !xAuthentication) {
      return res.status(400).send('Faltan uno o más headers requeridos');
    }
  
    const fecha = new Date().toISOString().slice(0,16);
    console.log(fecha)
    if (isNaN(fecha !== xDate)) {
      return res.status(400).send('Header x-date inválido');
    }
    const signatureEsperada = ValidarSignature(urlOrigen, fecha);
    console.log(signatureEsperada)
    if (xSignature!==signatureEsperada) {
      return res.status(400).send('Header x-signature inválido');
    }
  
    if (xAuthentication!==process.env.SECRET_KEY) {
      return res.status(401).send('Header x-authentication inválido');
    }
  
    next();
  };
  
//Funcion para generar la Signature
const ValidarSignature = (url, date)=>{
    
    return crypto.createHmac('sha256', process.env.SECRET_KEY)
    .update(url + date)
    .digest('hex');
}

//Aplicando Middleware
app.use(express.json())
app.use(validarHeaders)


//Conexión a la bd
try {
  await db.authenticate();
  db.sync()
  console.log("conexión bien")
} catch (error) {
  console.log(error)
}


app.use(rutas)



app.listen(port, () =>{
    console.log(`El server esta encendido 
        ApiKey: ${process.env.SECRET_KEY}`)
})