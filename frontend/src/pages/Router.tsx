import { Route, Routes } from "react-router-dom";

import NotFound from "./NotFound";
import AuthLoginPage from "./auth/login.page";
import FaceEncodingListPage from "./face-encoding/list/face.encoding.list.page";
import FaceEncodingSummaryPage from "./face-encoding/summary/face.encoding.summary.page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLoginPage />} />
      <Route path="/login" element={<AuthLoginPage />} />
      <Route path="/face-encoding" element={<FaceEncodingListPage />} />
      <Route path="/face-encoding/:id" element={<FaceEncodingSummaryPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
