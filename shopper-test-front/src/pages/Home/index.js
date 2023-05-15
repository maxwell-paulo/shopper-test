import style from "./style.module.css";
import { useState, useEffect } from "react";
import { api } from "../../api/api.js";
import toast from "react-hot-toast";

export function Home() {
  const [form, setForm] = useState({
    code: "",
    sales_price: ""
  });

  const [camposPreenchidos, setCamposPreenchidos] = useState(false);

  useEffect(() => {
    setCamposPreenchidos(form.code.length > 0 && form.sales_price.length > 0);
  }, [form.code, form.sales_price]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const floatValue = parseFloat(form.sales_price);
    if (isNaN(floatValue)) {
      toast.error('O valor inserido não é um número válido');
      return;
    }

    try {
      await api.put(`${form.code}`, form);
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
    </div>
  );
}
