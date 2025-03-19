import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import { FaCheckCircle, FaTimesCircle, FaSync } from 'react-icons/fa'; // Ícones para status das mesas

const Home = () => {
  const navigate = useNavigate();
  const { mesas, orders } = useContext(OrderContext);
  const [filtro, setFiltro] = useState('todas');

  // Filtra as mesas com base no status
  const mesasFiltradas = mesas.filter((mesa) => {
    if (filtro === 'disponiveis') return mesa.status === 'disponivel';
    if (filtro === 'ocupadas') return mesa.status === 'ocupada';
    return true;
  });

  return (
    <div className="container text-center mt-3">
      {/* Botão para acessar a página de faturamento */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/faturamento')}
      >
        Ver Faturamento
      </button>
      <button
  className="btn btn-warning mb-3"
  onClick={() => navigate('/controle-insumos')}
>
  Controle de Insumos
</button>

      {/* Título da página */}
      <h2 className="mb-3">Mesas Disponíveis</h2>

      {/* Filtros de status das mesas */}
      <div className="mb-3">
        <button
          className={`btn ${filtro === 'todas' ? 'btn-primary' : 'btn-secondary'} me-2 mb-2`}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        <button
          className={`btn ${filtro === 'disponiveis' ? 'btn-primary' : 'btn-secondary'} me-2 mb-2`}
          onClick={() => setFiltro('disponiveis')}
        >
          Disponíveis
        </button>
        <button
          className={`btn ${filtro === 'ocupadas' ? 'btn-primary' : 'btn-secondary'} mb-2`}
          onClick={() => setFiltro('ocupadas')}
        >
          Ocupadas
        </button>
      </div>

      {/* Botão de atualização */}
      <button
        className="btn btn-info mb-3"
        onClick={() => window.location.reload()} // Recarrega a página
      >
        <FaSync /> Atualizar
      </button>

      {/* Lista de mesas */}
      <div className="row">
        {mesasFiltradas.map((mesa) => {
          const pedidosNaMesa = orders.filter((pedido) => pedido.mesa === mesa.numero).length;
          return (
            <div key={mesa.numero} className="col-6 col-md-4 col-lg-3 mb-3">
              <div
                className={`card ${mesa.status === 'ocupada' ? 'bg-danger text-white' : 'bg-success text-white'}`}
              >
                <div className="card-body">
                  {/* Ícone de status da mesa */}
                  <h5 className="card-title">
                    Mesa {mesa.numero}{' '}
                    {mesa.status === 'ocupada' ? (
                      <FaTimesCircle className="text-light" />
                    ) : (
                      <FaCheckCircle className="text-light" />
                    )}
                  </h5>

                  {/* Status da mesa */}
                  <p className="card-text">
                    {mesa.status === 'ocupada'
                      ? `Ocupada por: ${mesa.cliente}`
                      : 'Disponível'}
                  </p>

                  {/* Badge de pedidos ativos */}
                  {pedidosNaMesa > 0 && (
                    <span className="badge bg-warning text-dark mb-2">
                      {pedidosNaMesa} pedido(s) ativo(s)
                    </span>
                  )}

                  {/* Botão para acessar os pedidos da mesa */}
                  <button
                    className={`btn ${mesa.status === 'ocupada' ? 'btn-light' : 'btn-primary'} w-100`}
                    onClick={() => navigate(`/pedidos/${mesa.numero}`)}
                  >
                    {mesa.status === 'ocupada' ? 'Ver Pedidos' : 'Abrir Mesa'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;