import { updateProductService } from "./updateProduct.service.js";

const updateProductController = {
    async handle(req, res) {
        const { code } = req.params;
        const { name, cost_price, sales_price } = req.body;

        const service = updateProductService;

        const updateProduct = await service.execute(code, name, cost_price, sales_price);

        return res.json(updateProduct);
    }
}

export { updateProductController };
