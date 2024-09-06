import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [user, setUserState] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const loginUrl = 'https://040a09353dca8c9b.mokky.dev/auth';
  const registerUrl = 'https://040a09353dca8c9b.mokky.dev/register';
  const userDataUrl = 'https://040a09353dca8c9b.mokky.dev/users';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
      setUserState(user);
    } else if (token) {
      axios.get(userDataUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data && response.data.user) {
          dispatch(setUser(response.data.user));
          setUserState(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        } else {
          setError('Invalid user data response from server');
        }
      })
      .catch(error => {
        setError('Failed to fetch user data');
        console.log(error);
      });
    }
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(loginUrl, {
        email,
        password
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      console.log('Server response:', response.data);
      if (response.data && response.data.token && response.data.data) {
        const user = response.data.data;
        dispatch(setUser(user));
        setUserState(user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.log(error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(registerUrl, {
        name,
        email,
        password
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      console.log('Server response:', response.data);
      if (response.data && response.data.token && response.data.data) {
        const user = response.data.data;
        dispatch(setUser(user));
        setUserState(user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);