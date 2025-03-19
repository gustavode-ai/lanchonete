import React, { useState } from 'react';

const CardapioItem = ({ item, onAdicionar }) => {
  const [quantidade, setQuantidade] = useState(1);

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.nome}</h5>
          <p className="card-text">R$ {item.preco.toFixed(2)}</p>
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setQuantidade((qtd) => Math.max(1, qtd - 1))}
            >
              -
            </button>
            <span className="mx-2">{quantidade}</span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setQuantidade((qtd) => qtd + 1)}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => onAdicionar(item, quantidade)}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardapioItem;