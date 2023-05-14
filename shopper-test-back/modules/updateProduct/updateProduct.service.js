import { productRepository } from "../../repository/product.repository.js";

const updateProductService = {
    async execute(code, name, cost_price, sales_price) {
        try {
            const repository = productRepository;

            const product = await repository.updateProduct(code, name, cost_price, sales_price);

            if (!product) {
                return {
                    error: 'Produto não encontrado',
                    status: 404
                };
            }

            return product;
        } catch (err) {
            return {
                error: err.message,
                status: 500
            };
        }
    }
}

export { updateProductService };
