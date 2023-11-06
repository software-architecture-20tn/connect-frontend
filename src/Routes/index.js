import Home from "../Pages/Home";
import Login from "../Pages/LogIn";
import Signup from "../Pages/Signup";

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Signup },
];

const privateRoutes = [{ path: "/", component: Home }];

export { publicRoutes, privateRoutes };
