import express from "express";
import { getAllProductsController } from "../modules/getAllProducts/getAllProducts.controller.js";
import { getOneProductController } from "../modules/getOneProduct/getOneProduct.controller.js";
import { updateProductController } from "../modules/updateProduct/updateProduct.controller.js";

const productRouter = express.Router()

// Read all products
productRouter.get("", getAllProductsController.handle);

// Read one product
productRouter.get("/:code", getOneProductController.handle);

// update product
productRouter.put("/:code", updateProductController.handle)

export { productRouter }
