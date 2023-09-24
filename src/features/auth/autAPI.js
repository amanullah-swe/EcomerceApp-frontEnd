// A mock function to mimic making an async request for data
import { BASE_URL } from "../../app/constant";
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(userData)
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
export function checkUser(loginInfo) {
  const { email, password } = loginInfo;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const data = await response.json();
      return resolve(data);
    } catch (error) {
      reject(error);
    }

  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${update.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const data = await response.json();
      return resolve(data);
    } catch (error) {
      reject(error);
    }

  }
  );
}

export function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        return reject(data);
      }
      const data = await response.json();
      return resolve(data);
    } catch (error) {
      reject(error);
    }
  }
  );
}