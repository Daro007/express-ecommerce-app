const productsModel = require("../models/productsModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      let products = await productsModel.find({});
      res.json(products);
    } catch (e) {
      next(e);
    }
  },
  getById: async function (req, res, next) {
    try {
      let product = await productsModel.findById(req.params.id);
      res.json(product);
    } catch (e) {
      console.log(`El producto con ID ${req.params.id} no existe`);
      next(e);
    }
  },
  createProduct: async function (req, res, next) {
    try {
      let product = new productsModel({
        name: req.body.name,
        sku: req.body.sku,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
      });
      let newProduct = await product.save();
      console.log(`Nombre del producto creado: ${product.name}`);
      res.json(newProduct);
    } catch (e) {
      next(e);
    }
  },
  updateProdruct: async function (req, res, next) {
    try {
      let product = await productsModel.updateOne(
        { _id: req.params.id },
        req.body,
        { multi: false }
      );
      res.json(product);
      console.log("Producto actualizado");
    } catch (e) {
      next(e);
    }
  },
  deleteProdruct: async function (req, res, next) {
    try {
      let product = await productsModel.deleteOne({ _id: req.params.id });
      res.json(product);
      console.log(`Producto con ID ${req.params.id} eliminado`);
    } catch (e) {
      next(e);
    }
  },
};
