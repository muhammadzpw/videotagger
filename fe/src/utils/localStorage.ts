const USER_KEY = 'USER';
const LOGIN_METADATA = 'LOGIN_METADATA';

interface Metadata {
  fromBarcode?: boolean;
}

const isUserExistLocalStorage = () => {
  return !!getLocalStorageUser();
};

const getLocalStorageUser = () => {
  const jsonUser = localStorage.getItem(USER_KEY);
  return jsonUser ? JSON.parse(jsonUser) : jsonUser;
};

const getLocalStorageMetadata = () => {
  const jsonMetadata = localStorage.getItem(LOGIN_METADATA);
  return jsonMetadata ? JSON.parse(jsonMetadata) : jsonMetadata;
};

const setLocalStorageMetadata = (metadata: Metadata) => {
  localStorage.setItem(LOGIN_METADATA, JSON.stringify(metadata));
};

const setLocalStorageUser = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const localStorageDestroy = () => {
  localStorage.clear();
};

export {
  USER_KEY,
  LOGIN_METADATA,
  localStorageDestroy,
  setLocalStorageUser,
  getLocalStorageUser,
  isUserExistLocalStorage,
  getLocalStorageMetadata,
  setLocalStorageMetadata,
};
