import Home from "../Pages/Home";
import Login from "../Pages/LogIn";
import Signup from "../Pages/Signup";
import PasswordForgot from "../Pages/PasswordForgot";

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Signup },
  { path: "/forgot-password", component: PasswordForgot },
];

const privateRoutes = [{ path: "/", component: Home }];

export { publicRoutes, privateRoutes };
