import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageNotFound from "./containers/PageNotFound";

import { renderRoutes } from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <BrowserRouter>
        <Routes>
          {renderRoutes()}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
