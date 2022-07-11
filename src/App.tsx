import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import ManageTypes from "./containers/ManageTypes";
import { APP_ROUTES } from "./utils/enums";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.ROOT} element={<Home />} />
          <Route path={APP_ROUTES.TYPES} element={<ManageTypes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
