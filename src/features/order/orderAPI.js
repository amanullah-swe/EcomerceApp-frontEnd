export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const data = await response.json();
    resolve(data)
  }
  );
}
export function fetchALLOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders`);
    const data = await response.json();
    resolve(data)
  }
  );
}

export function updateOrder(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/${update.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    });
    const data = await response.json();
    resolve(data)
  }
  );
}

export function fetchOrdersByFilter({ sort, pagination }) {
  // filter= {category:smartphone, }
  let queryString = '';
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders?${queryString}`);
    const data = await response.json();
    const totalOrders = response.headers.get('X-Total-Count');
    resolve({ orders: data, totalOrders: totalOrders });
  }
  );
}