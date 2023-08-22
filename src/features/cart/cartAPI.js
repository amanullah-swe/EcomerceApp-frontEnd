// A mock function to mimic making an async request for data
export function createCartItem(cartItem) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItem)
    });
    const data = await response.json();
    resolve(data)
  }
  );
}
export function fetchCartItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart?user=${userId}`);
    const data = await response.json();
    resolve(data)
  }
  );
}
export function updateCartItemById(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${update.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });
    const data = await response.json();
    resolve(data);
  }
  );
}
export function deleteCartItemById(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    resolve(itemId);
  }
  );
}