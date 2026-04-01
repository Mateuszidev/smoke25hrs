export default function Smoke25hrsCatalogo() {
  const phone = "5521979668909";
  const products = [
    { name: "Pods", price: "a partir de R$ 110,00", desc: "Diversos sabores e marcas" },
    { name: "Essências", price: "consulte valores", desc: "Opções premium para narguilé" },
    { name: "Narguilés", price: "consulte valores", desc: "Modelos completos e acessórios" },
    { name: "Canetas Vaporizadoras", price: "consulte valores", desc: "Praticidade e qualidade" },
    { name: "Isqueiros", price: "consulte valores", desc: "Diversos modelos" },
    { name: "Kits", price: "consulte valores", desc: "Combos promocionais" },
  ];

  const whatsappLink = (product) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(
      `Olá! Tenho interesse em ${product} da Smoke 25hrs. Pode me passar mais detalhes?`
    )}`;

  return (
    <div className="min-h-screen bg-[#2b0000] text-white">
      <header className="text-center py-10 px-6 border-b border-orange-500/30">
        <img
          src="/mnt/data/Logo Smoke25hrs.png"
          alt="Smoke 25hrs"
          className="mx-auto w-48 rounded-2xl shadow-xl mb-6"
        />
        <h1 className="text-4xl font-bold tracking-wide">SMOKE 25HRS</h1>
        <p className="mt-3 text-lg text-orange-200">
          Entrega expressa em todo RJ capital • Envio para todo o Brasil
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-[#3a0909] rounded-2xl shadow-lg border border-orange-500/20 p-6"
            >
              <h2 className="text-2xl font-semibold text-orange-400">{item.name}</h2>
              <p className="mt-2 text-lg">{item.price}</p>
              <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
              <a
                href={whatsappLink(item.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block w-full text-center bg-orange-500 hover:bg-orange-600 transition rounded-xl py-3 font-semibold"
              >
                Comprar no WhatsApp
              </a>
            </div>
          ))}
        </section>

        <section className="mt-12 bg-[#3a0909] rounded-2xl p-6 border border-orange-500/20">
          <h3 className="text-2xl font-bold text-orange-400">Pagamentos</h3>
          <p className="mt-3 text-gray-300">
            Aceitamos Pix, cartão, dinheiro e demais formas de pagamento.
          </p>
        </section>
      </main>
    </div>
  );
}
