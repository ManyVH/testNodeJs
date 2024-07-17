import { Item } from "../models/Items.js";

//Funcion para obtener todos los items
const obtenerItem = async (req, res) => {
  try {
    const items = await Item.findAll();
    const listaItems = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      console.log(item);
      listaItems.push({
        id: item.dataValues.id,
        nombre: item.dataValues.nombre,
        descripcion: item.dataValues.descripcion,
        signature: item.dataValues.signature,
      });
    }
    console.log(listaItems);
    return res.status(200).json({
        Status: res.status,
        lista: listaItems
    });
  } catch (error) {
    return res.status(500).json({
        Status: res.status,
        error: "Fallo interno del servidor"
    });
  }
};
//Funcion para cargar un nuevo item
const cargarItem = async (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let signature = req.headers["x-signature"];

  try {
    await Item.create({
      nombre: nombre,
      descripcion: descripcion,
      signature: signature,
    });
    return res.status(200).json({
        Status: res.status,
        error: "Item Creado correctamente"
    });
  } catch (error) {
    return res.status(500).json({
        Status: res.status,
        error: "Fallo interno del servidor"
    });
  }
};

//Funcion para actualizar items
const actualizarItem = async (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let signature = req.headers["x-signature"];
  try {
    //Verifica si existe el item
    const item = await Item.findOne({ where:{ id: parseInt(req.params.id)} });
    if (item !== null) {
        //Actualiza los datos del item
        item.nombre = nombre;
        item.descripcion = descripcion;
        item.signature = signature;
        item.save();
        return res.status(200).json({
            Status: res.status,
            error: "Item modificado correctamente"
        });
    } else {
      return res.status(404).json({
        Status: res.status,
        error: "Item no encontrado"
    });
    }
  } catch (error) {
    return res.status(200).json({
        Status: res.status,
        error: "Item Creado correctamente"
    });
  }
};
export { obtenerItem, cargarItem, actualizarItem };
