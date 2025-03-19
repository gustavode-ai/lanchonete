import React, { createContext, useState } from 'react';

// Cria o contexto
export const OrderContext = createContext();

// Cria o provedor do contexto
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Estado para os pedidos
  const [mesas, setMesas] = useState([ // Estado para as mesas
    { numero: 1, status: 'disponivel', cliente: '' },
    { numero: 2, status: 'disponivel', cliente: '' },
    { numero: 3, status: 'disponivel', cliente: '' },
    { numero: 4, status: 'disponivel', cliente: '' },
    { numero: 5, status: 'disponivel', cliente: '' },
  ]);
  const [cardapio, setCardapio] = useState([ // Estado para o cardápio
    { id: 1, nome: 'Hambúrguer', preco: 10.0 },
    { id: 2, nome: 'Batata Frita', preco: 5.0 },
    { id: 3, nome: 'Refrigerante', preco: 3.0 },
  ]);

  // Função para adicionar um pedido
  const addOrder = (item) => {
    setOrders([...orders, item]);
  };

  // Função para remover um pedido
  const removeOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  // Função para limpar os pedidos
  const clearOrders = () => {
    setOrders([]);
  };

  // Função para adicionar um item ao cardápio
  const adicionarItemCardapio = (item) => {
    setCardapio([...cardapio, { ...item, id: cardapio.length + 1 }]);
  };

  // Função para remover um item do cardápio
  const removerItemCardapio = (id) => {
    setCardapio(cardapio.filter((item) => item.id !== id));
  };

  // Função para atualizar um item do cardápio
  const atualizarItemCardapio = (id, novosDados) => {
    setCardapio(
      cardapio.map((item) =>
        item.id === id ? { ...item, ...novosDados } : item
      )
    );
  };

  // Função para adicionar uma nova mesa
  const adicionarMesa = (numero) => {
    setMesas([...mesas, { numero, status: 'disponivel', cliente: '' }]);
  };

  // Função para remover uma mesa
  const removerMesa = (numero) => {
    setMesas(mesas.filter((mesa) => mesa.numero !== numero));
  };

  // Função para calcular o faturamento
  const calcularFaturamento = (periodo) => {
    const agora = new Date();
    let dataInicio;

    switch (periodo) {
      case 'dia':
        dataInicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
        break;
      case 'semana':
        dataInicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - agora.getDay());
        break;
      case 'mes':
        dataInicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
        break;
      case 'ano':
        dataInicio = new Date(agora.getFullYear(), 0, 1);
        break;
      default:
        dataInicio = new Date(0); // Todos os pedidos
    }

    // Filtra os pedidos pelo período
    const pedidosFiltrados = orders.filter(
      (pedido) => new Date(pedido.timestamp) >= dataInicio
    );

    // Calcula o faturamento total
    const faturamento = pedidosFiltrados.reduce(
      (total, pedido) => total + pedido.preco * pedido.quantidade,
      0
    );

    return {
      faturamento,
      pedidos: pedidosFiltrados,
    };
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        mesas,
        cardapio,
        setCardapio, // Certifique-se de que setCardapio está sendo passado
        addOrder,
        removeOrder,
        clearOrders,
        setMesas,
        adicionarItemCardapio,
        removerItemCardapio,
        atualizarItemCardapio,
        adicionarMesa,
        removerMesa,
        calcularFaturamento,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};