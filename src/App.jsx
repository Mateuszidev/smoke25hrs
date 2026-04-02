import { useEffect, useRef } from "react";
import "./App.css";

const products = [
  { name: "Cigarro Eletrônico",     price: "a partir de R$ 110,00", icon: "💨", image: "cigarro.png" },
  { name: "Essências",              price: "a partir de 80,00",       icon: "🌿", image: "essencias.png" },
  { name: "Canetas Vaporizadoras",  price: "consulte valores",       icon: "🖊️", image: "caneta.png" },
  { name: "Isqueiros",              price: "consulte valores",       icon: "🔥", image: "isqueiros.png" },
  { name: "Produtos Especiais",     price: "consulte valores",       icon: "⭐", image: "especial.png" },
];

const PHONE = "5521979668909";

function waLink(name) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(
    `Olá! Tenho interesse em ${name} da Smoke 25hrs.`
  )}`;
}

function ProductCard({ product, index }) {
  return (
    <div className="card" style={{ animationDelay: `${0.05 + index * 0.07}s` }}>
      <div className="card-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="card-image-placeholder">
            <span className="card-icon">{product.icon}</span>
            <span className="card-img-label">Adicione sua foto aqui</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="card-name">{product.name}</div>
        <div className="card-price">{product.price}</div>
        <a
          href={waLink(product.name)}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp"
        >
          💬 Comprar via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const logoRef = useRef(null);

  return (
    <>

      {/* Smoke background */}
      <div className="smoke-bg">
        <div className="smoke-layer s1" />
        <div className="smoke-layer s2" />
        <div className="smoke-layer s3" />
      </div>
      <div className="grain" />

      <div className="site">
        {/* HEADER */}
        <header>
          <div className="logo-wrap">
            <img
              ref={logoRef}
              src="/logo.png"
              alt="Smoke 25HRS"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div className="logo-fallback" style={{ display: "none" }}>🌿</div>
          </div>
          <h1 className="brand-name">SMOKE 25HRS</h1>
          <p className="tagline">
            Entrega expressa em todo RJ capital &bull; Envio para todo Brasil
          </p>
        </header>

        {/* DIVIDER */}
        <div className="divider">
          <div className="divider-line" />
          <span className="divider-icon">🔥</span>
          <div className="divider-line" />
        </div>

        <h2 className="section-title">Nossa Vitrine</h2>

        {/* PRODUCTS GRID */}
        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <span className="footer-brand">SMOKE 25HRS</span>
            <p className="footer-info">
              Atendimento via WhatsApp<br />
              Entrega rápida &bull; Qualidade garantida
            </p>
            <span className="footer-badge">🚀 Aberto 25 horas por dia</span>
          </div>
        </footer>
      </div>
    </>
  );
}
