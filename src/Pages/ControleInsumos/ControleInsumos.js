import React, { useContext, useState } from 'react';
import { OrderContext } from '../../context/OrderContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ControleInsumos = () => {
  const { cardapio, setCardapio, mesas, setMesas } = useContext(OrderContext);
  const [novoItem, setNovoItem] = useState({ nome: '', preco: 0 });
  const [novaMesa, setNovaMesa] = useState('');

  // Adiciona um novo item ao cardápio
  const handleAdicionarItem = () => {
    if (!novoItem.nome || novoItem.preco <= 0) {
      toast.error('Preencha todos os campos corretamente!');
      return;
    }
    setCardapio([...cardapio, { ...novoItem, id: cardapio.length + 1 }]); // Use setCardapio
    setNovoItem({ nome: '', preco: 0 });
    toast.success('Item adicionado ao cardápio!');
  };

  // Adiciona uma nova mesa
  const handleAdicionarMesa = () => {
    if (!novaMesa) {
      toast.error('Digite o número da mesa!');
      return;
    }
    setMesas([...mesas, { numero: parseInt(novaMesa), status: 'disponivel', cliente: '' }]);
    setNovaMesa('');
    toast.success('Mesa adicionada!');
  };

  return (
    <div className="container mt-3">
      <h2>Controle de Insumos</h2>

      {/* Adicionar Item ao Cardápio */}
      <div className="mb-4">
        <h3>Adicionar Item ao Cardápio</h3>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome do Item"
              value={novoItem.nome}
              onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Preço"
              value={novoItem.preco}
              onChange={(e) => setNovoItem({ ...novoItem, preco: parseFloat(e.target.value) })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={handleAdicionarItem}>
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Adicionar Nova Mesa */}
      <div className="mb-4">
        <h3>Adicionar Nova Mesa</h3>
        <div className="row">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Número da Mesa"
              value={novaMesa}
              onChange={(e) => setNovaMesa(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAdicionarMesa}>
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Itens do Cardápio */}
      <div className="mb-4">
        <h3>Cardápio Atual</h3>
        <ul className="list-group">
          {cardapio.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.nome} - R$ {item.preco.toFixed(2)}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setCardapio(cardapio.filter((i) => i.id !== item.id))}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lista de Mesas */}
      <div>
        <h3>Mesas Disponíveis</h3>
        <ul className="list-group">
          {mesas.map((mesa) => (
            <li key={mesa.numero} className="list-group-item d-flex justify-content-between align-items-center">
              Mesa {mesa.numero} - {mesa.status}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setMesas(mesas.filter((m) => m.numero !== mesa.numero))}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ControleInsumos;