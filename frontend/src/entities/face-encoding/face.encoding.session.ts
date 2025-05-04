import { FaceEncoding } from "./face.encoding";

export type FaceEncodingSession = {
  id: string;
  status: string;
  encodings: FaceEncoding[];
  createdAt: Date;
};
