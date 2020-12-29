export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  sessionId: string;
  user: User;
}
