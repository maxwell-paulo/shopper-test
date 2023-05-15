import { useState, useEffect } from "react";
import { api } from "../../api/api.js";


export function Home() {
  const [form, setForm] = useState({
    code: "",
    sales_price: ""
  })

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value})

  }


  async function handleSubmit(e) {
    e.preventDefault()

    const floatValue = parseFloat(form.sales_price);
    if (isNaN(floatValue)) {
      console.error('O valor inserido não é um número de ponto flutuante válido');
      return;
    }

    try {
      await api.put(`${form.code}`, form);

    } catch (err) {
      console.log(err);
    }

  }



  return (
    <div>
      <h1>Atualizar o preço do produto:</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="codigo">Código do produto:</label>
      <input id="codigo" name="code" step="1" type="number" value={form.code} onChange={handleChange} />
      <label htmlFor="preco">Novo preço do produto:</label>
      <input id="preco" name="sales_price" type="text" value={form.sales_price} onChange={handleChange}/>
      <button type="submit">Atualizar produto</button>
      </form>

    </div>
  )

}
