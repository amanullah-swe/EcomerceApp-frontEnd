// A mock function to mimic making an async request for data

//  READ
export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products`, {
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

  });
}

// CREAT
export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(product)
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

// UPDATE

export function updateProductById(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${update.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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


export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
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

export function fetchProductsByFilter({ filter, sort, pagination }) {
  try {
    console.log({ filter, sort, pagination });
    // filter= {category:smartphone, }
    let queryString = '';
    for (let key in filter) {
      for (let i in filter[key]) {
        queryString += `${key}=${filter[key][i]}&`
      }
    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`
    }

    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`
    }
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`http://localhost:8080/products?${queryString}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data)
      }
      const data = await response.json();
      const totalItems = response.headers.get('X-Total-Count');
      return resolve({ products: data, totalItems: totalItems });
    });
  } catch (error) {
    console.log(error);
  }
}

export function fetchAllBrands() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/brands`, {
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      return reject(data);
    }
    const data = await response.json();
    return resolve(data)
  }
  );
}
export function fetchAllCategories() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/categories`, {
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      return reject(data);
    }
    const data = await response.json();
    return resolve(data)
  }
  );
}
