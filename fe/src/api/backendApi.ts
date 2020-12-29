import { CONFIG } from '../constants/config';
import { LoginResponse, User } from '../models/response';

import { API } from './constants';
import { HttpClient } from './HttpClient';

class BackendApi extends HttpClient {
  public async login(email: string, password: string) {
    const response = await this.instance.post<any, LoginResponse>(
      API.AUTH.LOGIN,
      {
        email,
        password,
      },
    );
    return response;
  }

  public async logout() {
    await this.instance.delete(API.AUTH.LOGOUT);
  }

  public async me() {
    return await this.instance.get<any, User>(API.AUTH.ME);
  }

  public async loginByCode(code: string) {
    return await this.instance.post<any, LoginResponse>(API.AUTH.LOGIN_CODE, {
      code,
    });
  }
}

const backendApi = new BackendApi(CONFIG.API_URL, true);

export { backendApi, BackendApi };
