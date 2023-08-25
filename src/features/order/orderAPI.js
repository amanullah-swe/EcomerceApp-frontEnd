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
