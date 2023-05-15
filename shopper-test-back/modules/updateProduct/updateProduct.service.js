import { productRepository } from "../../repository/product.repository.js";
import { ApiError } from "../../utils/ApiError.js";
import {HTTP_STATUS_CODES} from "../../utils/const.js";

const updateProductService = {
    async execute(code, name, cost_price, sales_price) {
            const repository = productRepository;

            const product = await repository.getOneProduct(code)

            // the new sales_price must be greater than the product cost_price.
            if (parseFloat(sales_price) <= parseFloat(product.cost_price)) {
              throw new Error("Erro test", HTTP_STATUS_CODES.badRequest)
            }


              // the new sales_price must be 10% greater or less than the current sales_price
            const newSalesPrice = parseFloat(sales_price);
            const currentSalesPrice = parseFloat(product.sales_price);
            const tenPercentIncrease = parseFloat((currentSalesPrice * 1.1).toFixed(2));
            const tenPercentDecrease = parseFloat((currentSalesPrice * 0.9).toFixed(2))

            if (newSalesPrice > tenPercentIncrease || newSalesPrice < tenPercentDecrease) {
              return { error: "O preço de venda novo deve ser 10% maior ou menor que o preço de venda antigo",
              status: 404
              }
            }

            //update Product sales_price
            const updatedProduct = await repository.updateProduct(code, name, cost_price, sales_price);

            if (!updatedProduct) {
                return {
                    error: 'Produto não encontrado',
                    status: 404
                };
            }

            return updatedProduct;
    }
}

export { updateProductService };
