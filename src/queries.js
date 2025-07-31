import axios from "axios";

const url = "https://authentication-express-js.onrender.com/api";

export async function getUsers() {
  try {
    const token = getToken()
    const email = getEmail()
    const res = await axios.get(`${url}/filter`, {
    params: {email},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return res
  } catch (err) {
    alert(JSON.stringify(err.response.data.message))
    if (err.response.data.message == 'Your account blocked') {
      alert('Your account blocked')
    }
  }
}
export async function deleteUsers(arr) {
  const token = getToken()
  try {
const res = await axios.delete(`${url}/delete/`, {
      data: { ids: arr },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
     alert(JSON.stringify(error.response.data.message))
  }
}

export async function registerUser({ name, email, password, rememberMe }) {
  try {
    const res = await axios.post(`${url}`, {
      name,
      email,
      password,
      rememberMe,
    });
     saveToken(res.data.token);
     saveEmail(email)
    return res;
  } catch (err) {
    alert(err.response?.data?.message);
  }
}

export async function loginUser({ email, password }) {
  saveEmail(email)
  try {
    const res = await axios.post(`${url}/login`, {
    email,
    password,
  });
  saveToken(res.data.token);
  return res;
  } catch (error) {
    alert(JSON.stringify(error.response.data.message))
  }
}

export async function block(arr) {
  try {
    const token = getToken();
    const res = await axios.put(
      `${url}/block/`,
      { ids: arr },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (e) {
     alert(JSON.stringify(e.response.data.message))
  }
}
export async function unBlock(arr) {
  try {
    const token = getToken();
    const res = await axios.put(
      `${url}/unblock/`,
      { ids: arr },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (e) {
     alert(JSON.stringify(e.response.data.message))
  }
}

export function getToken() {
  return localStorage.getItem("token");
}
export function getEmail() {
  return localStorage.getItem("email");
}
export async function saveToken(token) {
  localStorage.setItem("token" , token);
}
export async function saveEmail(email) {
  localStorage.setItem("email" , email)
}
