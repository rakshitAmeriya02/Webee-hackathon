import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import ManageTypes from "./containers/ManageTypes";
import { APP_ROUTES } from "./utils/enums";

import "./App.css";
import TypeView from "./containers/TypeView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.ROOT} element={<Home />} />
          <Route path={APP_ROUTES.TYPES} element={<ManageTypes />} />
          <Route path={APP_ROUTES.TYPE} element={<TypeView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
