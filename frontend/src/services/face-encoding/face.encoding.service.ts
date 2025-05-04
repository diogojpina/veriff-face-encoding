import { FaceEncoding, FaceEncodingSession } from "../../entities";
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

  public static async getSession(id: string): Promise<FaceEncodingSession> {
    const token = UserStorage.getToken();
    const { data } = await api.get<FaceEncodingSession>(
      `/face-encoding/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

  public static async uploadImage(
    id: string,
    formData: FormData
  ): Promise<FaceEncoding> {
    const token = UserStorage.getToken();
    const { data } = await api.post<FaceEncoding>(
      `/face-encoding/uploadImage/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }
}
