import style from "./style.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";

export function Product() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await api.get(`/${code}`);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProduct();
  }, [code]);

  function handleButtonClick() {
    navigate("/");
  }

  return (
    <div className={style.container}>
    <div className={style.content}>
      <h1>{product.name}</h1>
      <div className={style.table}>
      <div className={style.tableFields}>
      <p>Código</p>
      <p>{product.code}</p>
      </div>
      <div className={style.tableFields}>
      <p>Preço de custo</p>
      <p>R${product.cost_price}</p>
      </div>
      <div className={style.tableFields}>
      <p>Preço de venda</p>
      <p>R${product.sales_price}</p>
      </div>
      </div>
      <button type="button" onClick={handleButtonClick}>Ir para a página inicial</button>
      </div>
    </div>
  );
}
