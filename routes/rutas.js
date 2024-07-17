import express from 'express'
import {obtenerItem, cargarItem,actualizarItem} from '../controllers/controllerItems.js'
const router = express.Router()

router.get('/items', obtenerItem)

router.post('/items', cargarItem)

router.put('/items/:id', actualizarItem)

export default router