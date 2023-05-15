import Product from "../model/product.model.js"

const productRepository= {
    getAllProducts: async () => {
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

    async updateProduct(code, sales_price) {
      const updatedProduct = await Product.update(
        {sales_price},
        { where: { code }, }
      );

      return updatedProduct;
    }

}

export { productRepository };
