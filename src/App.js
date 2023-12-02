// import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { publicRoutes, privateRoutes } from "./Routes";
// import { getToken } from "./_helpers/authHelpers";
import "./App.css";
import "./scss/variables.scss";

function App() {
  // const [isLogin, setIsLogin] = useState(getToken() !== null);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const theme = "light";
  return (
    <div className="App" data-theme={theme}>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={isLogin ? <Page /> : <Navigate to="/login" />}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
