import Pack from "../model/pack.model.js"

const packRepository = {
    getPacksByProductId: async (code) => {
        const packs = await Pack.findAll({
          where: {product_id: code}
        })

        return packs;
    },

}

export { packRepository };
