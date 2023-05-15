import style from "./style.module.css";
// import { Products } from "../../components/Products";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";
import toast from "react-hot-toast";

export function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    sales_price: ""
  });

  const [camposPreenchidos, setCamposPreenchidos] = useState(false);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("");
        setProduct([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
    setCamposPreenchidos(form.code.length > 0 && form.sales_price.length > 0);
  }, [form.code, form.sales_price]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const floatValue = parseFloat(form.sales_price);
    if (isNaN(floatValue)) {
      toast.error("O valor inserido não é um número válido");
      return;
    }

    try {
      await api.put(`${form.code}`, form);

      navigate(`/products/${form.code}`);
    } catch (err) {
      toast.error(err.response?.data);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Atualizar preço do produto</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formFields}>
            <div className={style.input}>
              <label htmlFor="codigo">Código do produto:</label>
              <input
                required
                id="codigo"
                name="code"
                step="1"
                type="number"
                value={form.code}
                onChange={handleChange}
              />
            </div>
            <div className={style.input}>
              <label htmlFor="preco">Novo preço do produto:</label>
              <input
                required
                id="preco"
                name="sales_price"
                type="text"
                value={form.sales_price}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" disabled={!camposPreenchidos}>
            Atualizar produto
          </button>
        </form>
      </div>
      {/* {product.map((currentProduct) => (
          <Products
            key={currentProduct.code}
            code={currentProduct.code}
            name={currentProduct.name}
            cost_price={currentProduct.cost_price}
            sales_price={currentProduct.sales_price}
          />
        ))} */}
    </div>
  );
}
