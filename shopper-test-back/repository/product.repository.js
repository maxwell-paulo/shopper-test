import Product from "../model/product.model.js"

const productRepository = {
    async getAllProducts() {
        const products = await Product.findAll()

        return products;
    },

    async getOneProduct(code) {
        const product = await Product.findOne({
            where: {
                code
            }
        });

        return product;
    },

    async updateProduct(code, name, cost_price, sales_price) {
      const updatedProduct = await Product.update(
        {
          name,
          cost_price,
          sales_price
        },
        { where: { code }, }
      );

      return updatedProduct;
    }
}

export { productRepository };
