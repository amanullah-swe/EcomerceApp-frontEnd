// A mock function to mimic making an async request for data

import { BASE_URL } from "../../api/ApiConfig";

export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
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

export function fetchALLOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
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
export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
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
  });
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
  return new Promise(async (resolve, reject) => {

    try {
      const response = await fetch(`${BASE_URL}/products?${queryString}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const totalItems = response.headers.get('X-Total-Count');
      return resolve({ products: data, totalItems: totalItems });
    } catch (error) {
      reject(error)
    }
    const response = await fetch(`${BASE_URL}/products?${queryString}`, {
      credentials: "include",
    });
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');
    resolve({ products: data, totalItems: totalItems });
  }
  );
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/brands`, {
      credentials: "include",
    });
    const data = await response.json();
    return resolve(data)
  }
  );
}
export function fetchAllCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const data = await response.json();
      return resolve(data)
    } catch (error) {
      reject(error);
    }

  });
}
