import {DataTypes} from 'sequelize'
import {db} from '../configs/db.js'

//Define el modelo del item
const Item = db.define('items',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    signature: DataTypes.STRING,
    
})


export {Item};