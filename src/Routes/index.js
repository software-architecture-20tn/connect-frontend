import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PasswordForgot from "../Pages/PasswordForgot";
import PasswordForgotConfirm from "../Pages/PasswordForgotConfirm/PasswordForgotConfirm";

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Signup },
  { path: "/forgot-password", component: PasswordForgot },
  { path: "/forgot-password-confirm", component: PasswordForgotConfirm },
];

const privateRoutes = [{ path: "/", component: Home }];

export { publicRoutes, privateRoutes };
