const baseUrl = "https://www.eventbriteapi.com/v3";
const token = import.meta.env.VITE_TOKEN_KEY;

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Something went wrong: ${res.status}`);
};

export default function getEvents() {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
