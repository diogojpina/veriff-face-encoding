import { LoginReturn } from "../../entities";
import UserStorage from "../../storage/UserStorage";
import { api } from "../clients/api.client";

export class AuthService {
  public static async login(loginData: {
    email: string;
    password: string;
  }): Promise<LoginReturn> {
    const { data } = await api.post<LoginReturn>(`/auth/login`, loginData);

    UserStorage.setToken(data.access_token);

    return data;
  }
}
