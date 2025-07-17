import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser, registerUser } from '../../../../services/useAuth';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../../services/useStore/useUserStore';
import { jwtDecode } from 'jwt-decode';
import type { UserJwtPayload } from '../../../../types/UserJwtPayload';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, [mode]);

  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register state
  const [form, setForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState<string | null>(null);

  const [registerSuccessMessage, setRegisterSuccessMessage] = useState<
    string | null
  >(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const userData = await loginUser({ username, password });

      if (userData) {
        const decodedToken = jwtDecode<UserJwtPayload>(userData.access_token);
        setUser({
          firstName: decodedToken.given_name,
          lastName: decodedToken.family_name,
          fullName: decodedToken.name,
          userName: decodedToken.preferred_username,
          email: decodedToken.email,
          accessToken: userData.access_token,
          refreshToken: userData.refresh_token,
        });
      }
      navigate('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('Login failed');
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterSuccessMessage(null);

    try {
      await registerUser(form);
      setRegisterSuccessMessage(
        'Register sucsessful. Please login to your account',
      );
      setMode('login');
      setForm({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      });
      setUsername(form.username);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setRegisterError(error.message);
      } else {
        setRegisterError('Registration failed');
      }
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordToggleIcon =
    showPassword ?
      <EyeOff
        size={18}
        className="cursor-pointer text-icons"
        onClick={() => setShowPassword(false)}
      />
    : <Eye
        size={18}
        className="cursor-pointer text-icons"
        onClick={() => setShowPassword(true)}
      />;

  return (
    <div className="flex justify-center px-4 pt-10">
      <div className="w-full max-w-lg bg-card backdrop-blur-xl border border-elements rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-center text-secondary text-sm mb-6">
          {mode === 'login' ?
            "Don't have an account? "
          : 'Already registered? '}
          <span
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setRegisterSuccessMessage(null);
            }}
            className="text-accent cursor-pointer hover:underline"
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </span>
        </p>

        {/* Показуємо повідомлення про успішну реєстрацію в режимі login */}
        {mode === 'login' && registerSuccessMessage && (
          <p className="text-green-600 text-center mb-4">
            {registerSuccessMessage}
          </p>
        )}

        {mode === 'login' && (
          <form
            onSubmit={handleLoginSubmit}
            className="space-y-4 animate-fade-in"
          >
            <input
              ref={usernameInputRef}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-1 border border-elements rounded-lg text-primary placeholder-secondary focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-1 border border-elements rounded-lg text-primary placeholder-secondary focus:ring-2 focus:ring-accent focus:outline-none pr-10"
              />
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                {passwordToggleIcon}
              </div>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-accent text-slate-50 rounded-lg hover:bg-hover transition"
            >
              Login
            </button>
            {loginError && (
              <p className="text-red text-sm mt-1">{loginError}</p>
            )}
          </form>
        )}

        {mode === 'register' && (
          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-4 animate-fade-in"
          >
            {['username', 'email', 'firstName', 'lastName'].map((field) => (
              <input
                key={field}
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleRegisterChange}
                value={form[field as keyof typeof form]}
                required
                className="w-full px-4 py-3 bg-surface-1 border border-elements rounded-lg text-primary placeholder-secondary focus:ring-2 focus:ring-accent focus:outline-none"
              />
            ))}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleRegisterChange}
                value={form.password}
                required
                className="w-full px-4 py-3 bg-surface-1 border border-elements rounded-lg text-primary placeholder-secondary focus:ring-2 focus:ring-accent focus:outline-none pr-10"
              />
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                {passwordToggleIcon}
              </div>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-accent text-slate-50 rounded-lg hover:bg-hover transition"
            >
              Register
            </button>
            {registerError && (
              <p className="text-red text-sm mt-1">{registerError}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
