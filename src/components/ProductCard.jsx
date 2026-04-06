import { useState } from "react";
import { formatCurrency } from "../utils/cart";

export default function ProductCard({ product, categoryName, index, onAddToCart }) {
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0] ?? "");

  return (
    <article className="product-card" style={{ animationDelay: `${0.08 + index * 0.06}s` }}>
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card-body">
        <div className="product-topline">
          <span className="product-category">{categoryName}</span>
          <span className="product-price">{formatCurrency(product.price)}</span>
        </div>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="flavor-block">
          <div className="flavor-title">Sabores disponiveis</div>
          <label className="flavor-picker">
            <span>Escolha o sabor</span>
            <select
              value={selectedFlavor}
              onChange={(event) => setSelectedFlavor(event.target.value)}
            >
              {product.flavors.map((flavor) => (
                <option key={`${product.id}-${flavor}`} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          className="btn-whatsapp"
          onClick={() => onAddToCart(product, categoryName, selectedFlavor)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
