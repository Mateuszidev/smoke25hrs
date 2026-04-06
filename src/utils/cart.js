export const CART_STORAGE_KEY = "smoke25hrs-cart";

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getCartCount(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function addCartItem(cartItems, product) {
  const existing = cartItems.find((item) => item.cartKey === product.cartKey);

  if (existing) {
    return cartItems.map((item) =>
      item.cartKey === product.cartKey ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
}

export function updateCartItemQuantity(cartItems, cartKey, nextQuantity) {
  if (nextQuantity <= 0) {
    return cartItems.filter((item) => item.cartKey !== cartKey);
  }

  return cartItems.map((item) =>
    item.cartKey === cartKey ? { ...item, quantity: nextQuantity } : item
  );
}

export function removeCartItem(cartItems, cartKey) {
  return cartItems.filter((item) => item.cartKey !== cartKey);
}

export function createWhatsAppMessage(cartItems) {
  const total = getCartTotal(cartItems);
  const lines = [
    "Ola! Quero finalizar este pedido da Smoke 25HRS:",
    "",
    ...cartItems.map(
      (item) =>
        `- ${item.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ""} | Qtd: ${
          item.quantity
        } | Unitario: ${formatCurrency(item.price)} | Subtotal: ${formatCurrency(
          item.price * item.quantity
        )}`
    ),
    "",
    `Total do pedido: ${formatCurrency(total)}`,
    "",
    "Tenho interesse em seguir com a compra. Podem confirmar a disponibilidade?",
  ];

  return lines.join("\n");
}

export function createWhatsAppLink(phone, cartItems) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(
    createWhatsAppMessage(cartItems)
  )}`;
}
