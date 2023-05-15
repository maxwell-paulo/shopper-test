import { productRepository } from "../../repository/product.repository.js";

const getAllProductsService = {
    async execute() {
        try {
            const repository = productRepository;

            const products = await repository.getAllProducts();

            return products;
        } catch (err) {
            return {
                error: err.message,
                status: 500
            };
        }
    }
}

export { getAllProductsService };
