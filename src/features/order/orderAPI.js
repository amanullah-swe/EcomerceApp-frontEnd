import { BASE_URL } from "../../api/ApiConfig";
export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`  ${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(order)
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data)
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error);
    }

  }
  );
}
export function fetchALLOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/`, {
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data)
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error);
    }
  }
  );
}

export function updateOrder(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${update.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(update)
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data)
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error);
    }
  }
  );
}

export function fetchOrdersByFilter({ sort, pagination }) {
  let queryString = '';
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${BASE_URL}/orders?${queryString}`, {
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      return reject(data);
    }
    const data = await response.json();
    const totalOrders = response.headers.get('X-Total-Count');
    return resolve({ orders: data, totalOrders: totalOrders });
  });
}

export function payment(order) {
  console.log(order);
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${BASE_URL}/payment/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ order }),
    });
    if (!response.ok) {
      const data = await response.json();
      return reject(data);
    } else {
      const data = await response.json();
      window.location.href = data.url;
      return resolve(data);
    }
    // In this code, if a 302 status code is encountered, it extracts the new URL from the Location header and resolves the promise with information about the redirection(e.g., the new URL).This way, you can handle the redirection in your frontend code if needed.
  });
}