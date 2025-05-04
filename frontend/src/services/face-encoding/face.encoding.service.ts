import { FaceEncodingSession } from "../../entities";
import UserStorage from "../../storage/UserStorage";
import { api } from "../clients/api.client";

export class FaceEncodingService {
  public static async list(): Promise<FaceEncodingSession[]> {
    const token = UserStorage.getToken();
    const { data } = await api.get<FaceEncodingSession[]>(`/face-encoding`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public static async createSession(): Promise<FaceEncodingSession> {
    const token = UserStorage.getToken();
    const { data } = await api.post<FaceEncodingSession>(
      `/face-encoding`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  }
}
