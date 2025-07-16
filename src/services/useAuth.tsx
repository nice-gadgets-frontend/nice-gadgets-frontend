// src/services/auth.ts

export type LoginParams = {
  username: string;
  password: string;
};

export async function loginUser({ username, password }: LoginParams) {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', 'react-client');
  params.append('username', username);
  params.append('password', password);

  const response = await fetch(
    'https://yelyzavetaz.website:8443/realms/nice-gadgets/protocol/openid-connect/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || 'Login failed');
  }

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);

  return data;
}

export type RegisterParams = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export async function registerUser({
  username,
  email,
  firstName,
  lastName,
  password,
}: RegisterParams) {
  const response = await fetch('https://yelyzavetaz.website/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      firstName,
      lastName,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}
