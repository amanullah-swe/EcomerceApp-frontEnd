// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    resolve(data)
  }
  );
}
export function checkUser(loginInfo) {
  const { email, password } = loginInfo;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const data = await response.json();
    if (data.length) {
      if (data[0].password === password) {
        resolve(data[0]);
      } else {
        reject({ message: 'Invalid password' });
      }
    }
    reject({ message: 'User not found' });
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${update.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });
    const data = await response.json();
    resolve(data);
  }
  );
}