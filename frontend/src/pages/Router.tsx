import { Route, Routes } from "react-router-dom";

import NotFound from "./NotFound";
import AuthLoginPage from "./auth/login";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthLoginPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
