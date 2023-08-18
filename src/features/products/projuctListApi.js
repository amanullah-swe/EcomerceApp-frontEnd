// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products`);
    const data = await response.json();
    resolve(data)
  }
  );
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve(data)
  }
  );
}

export function fetchProductsByFilter({ filter, sort, pagination }) {
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
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products?${queryString}`);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ products: data, totalItems: totalItems });
  }
  );
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/brands`);
    const data = await response.json();
    resolve(data)
  }
  );
}
export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/categories`);
    const data = await response.json();
    resolve(data)
  }
  );
}
