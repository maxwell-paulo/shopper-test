import { getAllProductsService } from "./getAllProducts.service.js";

const getAllProductsController = {
    async handle(req, res) {
        const service = getAllProductsService;

        const getAllProducts = await service.execute();
console.log(getAllProducts)
        return res.json(getAllProducts);

    }
}

export { getAllProductsController };
