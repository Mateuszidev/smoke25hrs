import { createWhatsAppLink, formatCurrency, getCartTotal } from "../utils/cart";

export default function CartPanel({
  phone,
  cartItems,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
  const total = getCartTotal(cartItems);
  const checkoutLink = cartItems.length ? createWhatsAppLink(phone, cartItems) : "#";

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside className={`cart-panel ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="cart-header">
          <div>
            <p className="eyebrow">Carrinho</p>
            <h2 className="section-title left">Seu pedido</h2>
          </div>
          <button type="button" className="cart-close" onClick={onClose} aria-label="Fechar carrinho">
            x
          </button>
        </div>

        {cartItems.length ? (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article key={item.cartKey} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.categoryName}</p>
                        {item.selectedFlavor ? (
                          <p className="cart-item-flavor">Sabor: {item.selectedFlavor}</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => onRemove(item.cartKey)}
                      >
                        Remover
                      </button>
                    </div>
                    <div className="cart-item-meta">
                      <span>Unitario: {formatCurrency(item.price)}</span>
                      <span>Subtotal: {formatCurrency(item.price * item.quantity)}</span>
                    </div>
                    <div className="cart-quantity">
                      <button type="button" onClick={() => onDecrease(item.cartKey)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onIncrease(item.cartKey)}>
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total-line">
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
              <button type="button" className="btn-secondary" onClick={onClear}>
                Limpar carrinho
              </button>
              <a href={checkoutLink} target="_blank" rel="noreferrer" className="btn-whatsapp">
                Finalizar compra
              </a>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <p>Seu carrinho esta vazio no momento.</p>
            <p>Adicione produtos para montar o pedido e finalizar pelo WhatsApp.</p>
          </div>
        )}
      </aside>
    </>
  );
}
