import { updateProductService } from "./updateProduct.service.js";

const updateProductController = {
    async handle(req, res) {
        const { code } = req.params;
        const { sales_price } = req.body;
try {
  const updateProduct = await updateProductService.execute(code, sales_price);

  return res.json(updateProduct);
} catch(error) {
  return res.status(error.status).send(error.message)

}
    }
}

export { updateProductController };
