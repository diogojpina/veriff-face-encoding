import { decodeJwt } from "jose";
import { User } from "../entities";

const storageKey = "@user";
const storageCart = "@cart";

class UserStorage {
  static hasToken = (): boolean => {
    const token = localStorage.getItem(storageKey);
    return !!token;
  };

  static getToken = (): string => {
    const token = localStorage.getItem(storageKey);
    return token || "";
  };

  static setToken = (userToken: string) => {
    localStorage.setItem(storageKey, userToken);
  };

  static get = (): User | null => {
    const token = UserStorage.getToken();
    if (!token) return null;

    const data: any = decodeJwt(token);
    return data ?? null;
  };

  static logout = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(storageCart);
  };
}

export default UserStorage;
