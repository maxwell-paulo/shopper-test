import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Toaster } from "react-hot-toast";

function App() {
  return (
  <div>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:code" element={<Product />} />
    </Routes>
    </div>
  );
}

export default App;
