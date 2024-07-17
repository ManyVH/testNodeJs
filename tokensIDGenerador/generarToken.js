import crypto from 'crypto'
import dotenv from "dotenv"
dotenv.config({path:'../.env'})

const url = '/items/3';
const xDate = new Date().toISOString().slice(0, 16);

const generateSignature = (url, date) => {
  return crypto.createHmac('sha256', process.env.SECRET_KEY)
               .update(url + date)
               .digest('hex');
};

const xSignature = generateSignature(url, xDate);

console.log('x-date:', xDate);
console.log('x-signature:', xSignature);