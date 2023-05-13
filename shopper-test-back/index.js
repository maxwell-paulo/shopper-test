import express from "express";
import * as dotenv from "dotenv";
import { sequelize } from "./config/db.config.js";
import { productRouter } from "./routes/product.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/product", productRouter)

app.listen(Number(process.env.PORT), () => {
  console.log('Servidor rodando na porta 4000!');
});
