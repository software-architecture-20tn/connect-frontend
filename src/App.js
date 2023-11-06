import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { publicRoutes, privateRoutes } from "./Routes";
import { getToken } from "./_helpers/authHelpers";
import "./App.css";
import "./scss/variables.scss";

function App() {
  const [isLogin, setIsLogin] = useState(getToken() !== null);
  // setToLS('all-themes', themes.default);
  const theme = "light";
  return (
    <Router>
      <div className="App" data-theme={theme}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            if (!isLogin) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page handleIsLogin={setIsLogin} />}
                />
              );
            } else {
              return null;
            }
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            if (isLogin) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page handleIsLogin={setIsLogin} />}
                />
              );
            } else {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Navigate to="/login" />}
                />
              );
            }
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
