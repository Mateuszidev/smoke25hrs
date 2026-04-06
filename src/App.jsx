import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";
import CartPanel from "./components/CartPanel";
import ProductCard from "./components/ProductCard";
import { categories, PHONE } from "./data/catalog";
import {
  CART_STORAGE_KEY,
  addCartItem,
  getCartCount,
  removeCartItem,
  updateCartItemQuantity,
} from "./utils/cart";
import "./App.css";

function SiteShell({ children, cartCount, onOpenCart }) {
  return (
    <>
      <div className="smoke-bg">
        <div className="smoke-layer s1" />
        <div className="smoke-layer s2" />
        <div className="smoke-layer s3" />
      </div>
      <div className="grain" />

      <div className="site">
        <header>
          <button type="button" className="cart-fab" onClick={onOpenCart}>
            Carrinho
            {cartCount > 0 ? <span>{cartCount}</span> : null}
          </button>

          <div className="logo-wrap">
            <img
              src="/logo.png"
              alt="Smoke 25HRS"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div className="logo-fallback" style={{ display: "none" }}>
              SM
            </div>
          </div>
          <h1 className="brand-name">SMOKE 25HRS</h1>
          <p className="tagline">Entrega expressa em todo RJ capital - Envio para todo Brasil</p>
        </header>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-icon">SMK</span>
          <div className="divider-line" />
        </div>

        {children}

        <footer>
          <div className="footer-inner">
            <span className="footer-brand">SMOKE 25HRS</span>
            <p className="footer-info">
              Atendimento via WhatsApp
              <br />
              Entrega rapida - Qualidade garantida
            </p>
            <span className="footer-badge">Aberto 25 horas por dia</span>
          </div>
        </footer>
      </div>
    </>
  );
}

function HomePage({ cartCount, onOpenCart }) {
  return (
    <SiteShell cartCount={cartCount} onOpenCart={onOpenCart}>
      <h2 className="section-title">Categorias</h2>
      <p className="section-copy">
        Clique em uma categoria para abrir os modelos reais, com descricao, preco e adicionar ao carrinho.
      </p>

      <div className="products-grid">
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>
    </SiteShell>
  );
}

function CategoryPage({ cartCount, onOpenCart, onAddToCart }) {
  const { slug } = useParams();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <SiteShell cartCount={cartCount} onOpenCart={onOpenCart}>
      <nav className="breadcrumb">
        <Link to="/">Categorias</Link>
        <span>/</span>
        <span>{category.name}</span>
      </nav>

      <section className="category-hero">
        <div>
          <p className="eyebrow">Catalogo da categoria</p>
          <h2 className="section-title left">{category.name}</h2>
          <p className="section-copy left">{category.teaser}</p>
        </div>
        <div className="category-preview">
          <img src={category.image} alt={category.name} />
        </div>
      </section>

      <section className="product-list">
        {category.products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={category.name}
            index={index}
            onAddToCart={onAddToCart}
          />
        ))}
      </section>
    </SiteShell>
  );
}

export default function App() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(() => {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) {
      return [];
    }

    return JSON.parse(saved).map((item) => ({
      ...item,
      cartKey: item.cartKey ?? `${item.id}::${item.selectedFlavor ?? "sem-sabor"}`,
    }));
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  const cartCount = getCartCount(cartItems);

  function handleAddToCart(product, categoryName, selectedFlavor) {
    setCartItems((current) =>
      addCartItem(current, {
        ...product,
        categoryName,
        selectedFlavor,
        cartKey: `${product.id}::${selectedFlavor}`,
      })
    );
    setIsCartOpen(true);
  }

  function handleIncrease(cartKey) {
    setCartItems((current) => {
      const item = current.find((entry) => entry.cartKey === cartKey);
      return updateCartItemQuantity(current, cartKey, item.quantity + 1);
    });
  }

  function handleDecrease(cartKey) {
    setCartItems((current) => {
      const item = current.find((entry) => entry.cartKey === cartKey);
      return updateCartItemQuantity(current, cartKey, item.quantity - 1);
    });
  }

  function handleRemove(cartKey) {
    setCartItems((current) => removeCartItem(current, cartKey));
  }

  function handleClear() {
    setCartItems([]);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />}
        />
        <Route
          path="/categoria/:slug"
          element={
            <CategoryPage
              cartCount={cartCount}
              onOpenCart={() => setIsCartOpen(true)}
              onAddToCart={handleAddToCart}
            />
          }
        />
      </Routes>

      <CartPanel
        phone={PHONE}
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    </>
  );
}
