// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/auth/register`, {
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
      const response = await fetch(`http://localhost:8080/auth/login`, {
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
      const response = await fetch(`http://localhost:8080/users/${update.id}`, {
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
      const response = await fetch(`http://localhost:8080/auth/logout`, {
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