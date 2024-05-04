const express = require("express");
const productController = require("../controller/product");
const productRouter = express.Router();


productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProduct);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;