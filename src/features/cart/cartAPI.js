// A mock function to mimic making an async request for data
export function createCartItem(cartItem) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(cartItem)
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error)
    }
  });
}
export function fetchCartItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/user`, {
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data); user
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error)
    }
  });
}
export function updateCartItemById(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${update.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(update)
      }); if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error)
    }
  }
  );
}
export function deleteCartItemById(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error)
    }
  }
  );
}

export async function deleteCartAllItems(userId) {
  try {
    const items = await fetchCartItemsByUserId(userId);
    const deletePromises = items.map((item) => deleteCartItemById(item.id));
    return new Promise.all(deletePromises);
  } catch (error) {
    console.log(error);
  }
}