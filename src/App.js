import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Pedidos from './Pages/Pedidos/Pedidos';
import Faturamento from './Pages/Faturamento/Faturamento';
import ControleInsumos from './Pages/ControleInsumos/ControleInsumos'; // Importe o novo componente
import { OrderProvider } from './context/OrderContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <OrderProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedidos/:mesa" element={<Pedidos />} />
          <Route path="/faturamento" element={<Faturamento />} />
          <Route path="/controle-insumos" element={<ControleInsumos />} /> {/* Nova rota */}
        </Routes>
      </Router>
    </OrderProvider>
  );
};

export default App;