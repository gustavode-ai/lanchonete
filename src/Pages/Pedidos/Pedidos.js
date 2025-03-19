import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import CardapioItem from '../../components/CardapioItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pedidos = () => {
  const { mesa } = useParams(); // Pega o número da mesa da URL
  const navigate = useNavigate(); // Hook para navegação
  const [cliente, setCliente] = useState(''); // Estado para o nome do cliente
  const [observacoes, setObservacoes] = useState(''); // Estado para observações
  const { orders, addOrder, removeOrder, clearOrders, setMesas } = useContext(OrderContext); // Contexto de pedidos e mesas

  const cardapio = [
    { id: 1, nome: 'Hambúrguer', preco: 10.0 },
    { id: 2, nome: 'Batata Frita', preco: 5.0 },
    { id: 3, nome: 'Refrigerante', preco: 3.0 },
  ];

  // Adiciona um item ao pedido com quantidade
  const handleAdicionarPedido = (item, quantidade) => {
    if (quantidade < 1) return; // Evita quantidades inválidas
    const novoPedido = {
      ...item,
      quantidade,
      mesa: parseInt(mesa),
      cliente,
      timestamp: new Date(), // Adiciona o timestamp atual
    };
    addOrder(novoPedido); // Adiciona o pedido ao estado
  };

  // Envia a comanda para o Telegram
  const handleEnviarPreparo = () => {
    if (window.confirm('Tem certeza que deseja enviar a comanda para preparo?')) {
      const mensagem = formatarMensagem(orders, cliente, mesa, observacoes);
      enviarParaTelegram(mensagem);
      toast.success('Comanda enviada para preparo!'); // Notificação de sucesso
    }
  };

  // Formata a mensagem para o Telegram
  const formatarMensagem = (pedidos, cliente, mesa, observacoes) => {
    let mensagem = `📝 *Nova Comanda*:\n\n`;
    mensagem += `Mesa: ${mesa}\n`;
    mensagem += `Cliente: ${cliente}\n`;
    mensagem += `Observações: ${observacoes || 'Nenhuma'}\n\n`;
    mensagem += `*Itens*:\n`;
    pedidos
      .filter((pedido) => pedido.mesa === parseInt(mesa))
      .forEach((pedido, index) => {
        mensagem += `${index + 1}. ${pedido.nome} (x${pedido.quantidade}) - R$ ${(
          pedido.preco * pedido.quantidade
        ).toFixed(2)}\n`;
      });
    mensagem += `\nTotal: R$ ${pedidos
      .filter((pedido) => pedido.mesa === parseInt(mesa))
      .reduce((total, pedido) => total + pedido.preco * pedido.quantidade, 0)
      .toFixed(2)}`;
    return mensagem;
  };

  // Envia a mensagem para o Telegram
  const enviarParaTelegram = (mensagem) => {
    const token = '7799185968:AAHoKTtpKnTPNX8PW6v-7NeewN4e568IxkM';
    const chatId = '-4765052883';
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      mensagem
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log('Mensagem enviada:', data))
      .catch((error) => console.error('Erro ao enviar mensagem:', error));
  };

  // Libera a mesa e limpa os pedidos
  const handleLiberarMesa = () => {
    if (window.confirm('Tem certeza que deseja liberar a mesa?')) {
      setMesas((prevMesas) =>
        prevMesas.map((m) =>
          m.numero === parseInt(mesa) ? { ...m, status: 'disponivel', cliente: '' } : m
        )
      );
      clearOrders();
      toast.info('Mesa liberada com sucesso!'); // Notificação de informação
      navigate('/');
    }
  };

  // Calcula o total da comanda
  const total = orders
    .filter((pedido) => pedido.mesa === parseInt(mesa))
    .reduce((total, pedido) => total + pedido.preco * pedido.quantidade, 0);

  return (
    <div className="container mt-3">
      {/* Botão Voltar para Home */}
      <button
        className="btn btn-secondary mb-3 w-100"
        onClick={() => navigate('/')}
      >
        Voltar para Home
      </button>

      <h2 className="mb-3">Pedidos - Mesa {mesa}</h2>

      {/* Campo para o nome do cliente */}
      <div className="mb-3">
        <label htmlFor="cliente" className="form-label">
          Nome do Cliente:
        </label>
        <input
          type="text"
          className="form-control"
          id="cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      {/* Campo para observações */}
      <div className="mb-3">
        <label htmlFor="observacoes" className="form-label">
          Observações:
        </label>
        <textarea
          className="form-control"
          id="observacoes"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows="3"
        />
      </div>

      {/* Cardápio */}
      <h3 className="mb-3">Cardápio</h3>
      <div className="row">
        {cardapio.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3 mb-3"> {/* Duas colunas em mobile */}
            <CardapioItem
              item={item}
              onAdicionar={handleAdicionarPedido}
            />
          </div>
        ))}
      </div>

      {/* Comanda */}
      <h3 className="mb-3">Comanda</h3>
      <ul className="list-group mb-3">
        {orders
          .filter((pedido) => pedido.mesa === parseInt(mesa))
          .map((pedido, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {pedido.nome} (x{pedido.quantidade}) - R${' '}
                {(pedido.preco * pedido.quantidade).toFixed(2)}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeOrder(index)}
              >
                Remover
              </button>
            </li>
          ))}
      </ul>

      {/* Total da Comanda */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Total:</h4>
        <h4>R$ {total.toFixed(2)}</h4>
      </div>

      {/* Botão Liberar Mesa */}
      <button
        className="btn btn-info w-100 mb-3"
        onClick={handleLiberarMesa}
        disabled={orders.length === 0}
      >
        Liberar Mesa
      </button>

      {/* Botão Enviar para Preparo */}
      <button
        className="btn btn-success w-100"
        onClick={handleEnviarPreparo}
        disabled={orders.length === 0 || !cliente}
      >
        Enviar para Preparo
      </button>
    </div>
  );
};

export default Pedidos;