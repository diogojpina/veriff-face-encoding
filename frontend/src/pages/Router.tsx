import { Route, Routes } from "react-router-dom";

import NotFound from "./NotFound";
import AuthLoginPage from "./auth/login;page";
import FaceEncodingListPage from "./face-encoding/list/face.encoding.list.page";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthLoginPage />} />
      <Route path="/face-encoding" element={<FaceEncodingListPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
