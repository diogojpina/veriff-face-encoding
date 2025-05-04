import { Route, Routes } from "react-router-dom";

import NotFound from "./NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
