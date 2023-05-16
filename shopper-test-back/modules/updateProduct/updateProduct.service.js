import { productRepository } from "../../repository/product.repository.js";
import { packRepository } from "../../repository/pack.repository.js";
import { ApiError } from "../../utils/ApiError.js";
import {HTTP_STATUS_CODES} from "../../utils/const.js";


const updateProductService = {
    async execute(code, sales_price) {

            const product = await productRepository.getOneProduct(code)

            // the new sales_price must be greater than the product cost_price.
            if (parseFloat(sales_price) <= parseFloat(product.cost_price)) {
              throw new ApiError(`o preço de venda deve ser maior que o preço de custo que é de R$${product.cost_price}`, HTTP_STATUS_CODES.badRequest)
            }


            // the new sales_price must be 10% greater or less than the current sales_price
            const newSalesPrice = parseFloat(sales_price);
            const currentSalesPrice = parseFloat(product.sales_price);
            const tenPercentIncrease = parseFloat((currentSalesPrice * 1.1).toFixed(2));
            const tenPercentDecrease = parseFloat((currentSalesPrice * 0.9).toFixed(2))

            if (newSalesPrice > tenPercentIncrease || newSalesPrice < tenPercentDecrease) {
              throw new ApiError(`O preço de venda novo deve ser 10% maior ou menor que o preço de venda antigo que é de R$${product.sales_price}`, HTTP_STATUS_CODES.badRequest)
            }

            let products = [{code, sales_price}]

            // if the updated product is a pack and has only one product update the product price
              const packsByPackId = await packRepository.getPacksByPackId(code)
              if (packsByPackId.length == 1) {
                const packProduct = {code: packsByPackId[0].product_id.toString(), sales_price: (product.sales_price / packsByPackId[0].qty).toFixed(2).toString()}
                products.push(packProduct)
              }

            // If the Product is in a pack, update the pack sales_price
            const packsByProductId = await packRepository.getPacksByProductId(code)
            const packsProducts = packsByProductId.map((pack) => ({code: pack.pack_id.toString(), sales_price: (pack.qty * sales_price).toString()}))
            products = [...products, ...packsProducts]
            const productsUpdateRequests = products.map((product) => productRepository.updateProduct(product.code, product.sales_price))

            const updatedProducts = await Promise.all(productsUpdateRequests)

            return updatedProducts;
    }
}

export { updateProductService };
