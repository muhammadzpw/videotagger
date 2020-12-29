import React, { useState, createContext, useEffect } from 'react';

import { backendApi } from '../api/backendApi';
import { User } from '../models/response';
import {
  getLocalStorageUser,
  isUserExistLocalStorage,
  localStorageDestroy,
  setLocalStorageUser,
} from '../utils/localStorage';

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<Partial<User>>({});
const UserDispatchContext = createContext({
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  setUser: (user: User) => {
    // set user
  },
});
const AuthContext = createContext(false);
const AuthDispatchContext = createContext({
  login: () => {
    // login
  },
  logout: () => {
    // logout
  },
});

const AuthManager = ({ children }: Props) => {
  const [isLoggedIn, setLoggedIn] = useState(isUserExistLocalStorage);
  const [userDetails, setUserDetails] = useState<Partial<User>>({
    ...getLocalStorageUser(),
  });

  const login = () => {
    setLoggedIn(true);
  };

  const logout = async () => {
    await backendApi.logout();
    localStorageDestroy();
    setLoggedIn(false);
    setUserDetails({});
  };

  const setUser = (user: User) => {
    setUserDetails(user);
    setLocalStorageUser(user);
  };

  const fetchMe = async () => {
    try {
      const user = await backendApi.me();
      if (!user) {
        throw new Error('Unauthorized');
      }
      setLocalStorageUser(user);
    } catch (error) {
      console.error('Unauthorized');
      localStorageDestroy();
    }
  };

  useEffect(() => {
    fetchMe();
  });

  return (
    <AuthContext.Provider value={isLoggedIn}>
      <AuthDispatchContext.Provider value={{ login, logout }}>
        <UserContext.Provider value={userDetails}>
          <UserDispatchContext.Provider value={{ setUser }}>
            {children}
          </UserDispatchContext.Provider>
        </UserContext.Provider>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export {
  AuthManager,
  UserContext,
  AuthContext,
  AuthDispatchContext,
  UserDispatchContext,
};
