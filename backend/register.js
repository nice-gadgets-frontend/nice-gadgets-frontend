import axios from 'axios';

export default async function registerUser(req, res) {
  console.log('Register request body:', req.body);
  const { email, password } = req.body;

  try {
    console.log('Requesting admin token from Keycloak...');
    const tokenResponse = await axios.post(
      `${process.env.KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token`,
      new URLSearchParams({
        username: process.env.KEYCLOAK_ADMIN_USERNAME,
        password: process.env.KEYCLOAK_ADMIN_PASSWORD,
        grant_type: 'password',
        client_id: 'admin-cli',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Admin token received');
    const adminToken = tokenResponse.data.access_token;

    console.log('Creating user in Keycloak...');
    const createUserResponse = await axios.post(
      `${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
      {
        username: email,
        email: email,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: password,
            temporary: false,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('User created:', createUserResponse.status, createUserResponse.data);
    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Registration failed', details: err.response?.data || err.message });
  }
}
