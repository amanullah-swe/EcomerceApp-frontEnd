// A mock function to mimic making an async request for data
import { BASE_URL } from "../../app/constant";
export function fetchLoddInUser() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`  ${BASE_URL}/users/`, {
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
export function fetchUserOrders() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`  ${BASE_URL}/orders/user`, {
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      return reject(data);
    }
    const data = await response.json();
    return resolve(data);
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`  ${BASE_URL}/users/${update.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(update)
    });
    if (!response.ok) {
      const data = await response.json();
      return reject(data);
    }
    const data = await response.json();
    return resolve(data);
  }
  );
}