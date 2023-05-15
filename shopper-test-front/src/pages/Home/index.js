import style from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";
import toast from "react-hot-toast";
import Papa from "papaparse";

export function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    sales_price: ""
  });

  const [camposPreenchidos, setCamposPreenchidos] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const csvData = result.data;
        if (csvData.length > 1) {
          const [headerRow, dataRow] = csvData;
          const [productCode, newPrice] = dataRow;
          setForm({ code: productCode, sales_price: newPrice });
          setCamposPreenchidos(true);
        }
      },
      header: false,
      skipEmptyLines: true
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setCamposPreenchidos(form.code !== "" && form.sales_price !== "");
  };

  const handleSubmit = async (e) => {
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
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.tagH1}>Atualizar preço do produto</h1>
        <p className={style.tagP}>Atualize o preço importando um aquivo CSV ou manualmente preenchendo os campo</p>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formFields}>
            <div className={style.input}>
              <label className={style.tagLabel} htmlFor="codigo">Código do produto:</label>
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
              <label className={style.tagLabel} htmlFor="preco">Novo preço do produto:</label>
              <input
                required
                id="preco"
                name="sales_price"
                type="text"
                value={form.sales_price}
                onChange={handleChange}
              />
            </div>
            <div className={style.input}>
              <label className={style.tagLabel} htmlFor="csv">Arquivo CSV:</label>
              <input
                id="csv"
                name="csv"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
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
