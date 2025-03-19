import React from 'react';

const MenuItem = ({ name, price, onAdd }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">R$ {price.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={onAdd}>Adicionar</button>
      </div>
    </div>
  );
};

export default MenuItem;