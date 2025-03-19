import React from 'react';

const OrderList = ({ orders, onRemove }) => {
  return (
    <div className="mt-4">
      <h3>Pedidos</h3>
      <ul className="list-group">
        {orders.map((order, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {order.name} - R$ {order.price.toFixed(2)}
            <button className="btn btn-danger btn-sm" onClick={() => onRemove(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;