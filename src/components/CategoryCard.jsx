import { Link } from "react-router-dom";

export default function CategoryCard({ category, index }) {
  return (
    <article className="card" style={{ animationDelay: `${0.05 + index * 0.07}s` }}>
      <div className="card-image">
        {category.image ? (
          <img src={category.image} alt={category.name} />
        ) : (
          <div className="card-image-placeholder">
            <span className="card-icon">{category.accent}</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="card-name">{category.name}</div>
        <p className="card-copy">{category.teaser}</p>
        <div className="card-meta">{category.products.length} modelos disponiveis</div>
        <Link className="btn-primary" to={`/categoria/${category.slug}`}>
          Ver produtos
        </Link>
      </div>
    </article>
  );
}
