import { CONFIG } from '../constants/config';
import { State } from '../models/response';

import { API } from './constants';
import { HttpClient } from './HttpClient';

class BackendApi extends HttpClient {
  public async getFiles() {
    return this.instance.get<any, string[]>(API.DATA);
  }

  public async getState(filename: string) {
    return this.instance.get<any, any>(
      API.GET_STATE.replace(':filename', filename),
    );
  }

  public async saveState(state: State) {
    return this.instance.post<any, State>(API.POST_STATE, state);
  }
}

const backendApi = new BackendApi(CONFIG.API_URL, true);

export { backendApi, BackendApi };
