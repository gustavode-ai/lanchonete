import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaArrowLeft } from 'react-icons/fa'; // Importe o ícone de seta para a esquerda

// Registra os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Faturamento = () => {
    const { calcularFaturamento } = useContext(OrderContext);
    const [periodo, setPeriodo] = useState('dia'); // Estado para o período selecionado
    const navigate = useNavigate(); // Hook para navegação
  
    // Calcula o faturamento com base no período
    const { faturamento, pedidos } = calcularFaturamento(periodo);
  
    // Agrupa os pedidos por dia e soma os valores
    const pedidosAgrupados = pedidos.reduce((acc, pedido) => {
      const data = new Date(pedido.timestamp).toLocaleDateString(); // Converte para string de data (sem horas)
      if (!acc[data]) {
        acc[data] = 0; // Inicializa o valor do dia
      }
      acc[data] += pedido.preco * pedido.quantidade; // Soma os valores
      return acc;
    }, {});
  
    // Prepara os dados para o gráfico
    const labels = Object.keys(pedidosAgrupados); // Datas únicas
    const data = {
      labels,
      datasets: [
        {
          label: 'Faturamento',
          data: labels.map((data) => pedidosAgrupados[data]), // Valores somados por dia
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Faturamento ${periodo.charAt(0).toUpperCase() + periodo.slice(1)}`,
        },
      },
    };
  
    return (
      <div className="container mt-5">
        {/* Botão para voltar à página inicial com ícone e tamanho reduzido */}
        <button
          className="btn btn-secondary mb-3 d-flex align-items-center justify-content-center p-2"
          onClick={() => navigate('/')}
          style={{ width: 'auto' }}
        >
          <FaArrowLeft className="me-2" style={{ fontSize: '1rem' }} />
          <span style={{ fontSize: '0.9rem' }}>Voltar</span>
        </button>
  
        <h2>Faturamento</h2>
  
        {/* Filtros de período */}
        <div className="mb-3">
          <button
            className={`btn ${periodo === 'dia' ? 'btn-primary' : 'btn-secondary'} me-2`}
            onClick={() => setPeriodo('dia')}
          >
            Dia
          </button>
          <button
            className={`btn ${periodo === 'semana' ? 'btn-primary' : 'btn-secondary'} me-2`}
            onClick={() => setPeriodo('semana')}
          >
            Semana
          </button>
          <button
            className={`btn ${periodo === 'mes' ? 'btn-primary' : 'btn-secondary'} me-2`}
            onClick={() => setPeriodo('mes')}
          >
            Mês
          </button>
          <button
            className={`btn ${periodo === 'ano' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setPeriodo('ano')}
          >
            Ano
          </button>
        </div>
  
        {/* Card com o gráfico e faturamento total */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Faturamento Total: R$ {faturamento.toFixed(2)}
            </h5>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    );
  };

  export default Faturamento