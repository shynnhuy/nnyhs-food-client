import React, { lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
// import { useTransition, animated } from "react-spring";
// core components
// import AdminRoute from "layouts/Admin";
import UserRoute from "layouts/User";
import AuthRoute from "layouts/Auth";
import NotFound from "layouts/NotFound";
import ManagerRoute from "layouts/Manager";

// User
const Landing = lazy(() => import("views/User/Landing"));
const Profile = lazy(() => import("views/User/Profile"));
const Home = lazy(() => import("views/User/Home"));
const Shop = lazy(() => import("views/User/Shop"));
const Cart = lazy(() => import("views/User/Cart"));

// Admin
const Dashboard = lazy(() => import("views/Admin/Dashboard"));
const ListCategory = lazy(() => import("views/Admin/ListCategory"));
const ListShops = lazy(() => import("views/Admin/ListShops"));
const ListUsers = lazy(() => import("views/Admin/ListUsers"));

const Login = lazy(() => import("views/Auth/Login"));
const Register = lazy(() => import("views/Auth/Register"));

const App = () => {
  const location = useLocation();
  return (
    <Switch location={location}>
      {/* <ManagerRoute path="/" exact component={Dashboard} /> */}
      <UserRoute path="/" exact component={Landing} />
      <UserRoute path="/home" component={Home} />
      <UserRoute path="/profile" auth component={Profile} />
      <UserRoute path="/shop" auth component={Shop} />
      <UserRoute path="/cart" component={Cart} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/register" component={Register} />
      <Redirect path="/admin" exact to="/admin/dashboard" />
      <ManagerRoute path="/admin/dashboard" component={Dashboard} />
      <ManagerRoute path="/admin/users" component={ListUsers} />
      <ManagerRoute path="/admin/categories" component={ListCategory} />
      <ManagerRoute path="/admin/shops" component={ListShops} />
      {/* <AdminRoute path="/admin/dashboard" component={Dashboard} />
      <AdminRoute path="/admin/users" component={ListUsers} />
      <AdminRoute path="/admin/categories" component={ListCategory} />
      <AdminRoute path="/admin/shops" component={ListShops} /> */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default App;

// const App = () => {
//   const location = useLocation();
//   const transitions = useTransition(location, (location) => location.pathname, {
//     from: { opacity: 0, transform: "translate3d(100%,0,0)" },
//     enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
//     leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
//   });
//   return transitions.map(({ item: location, props, key }) => (
//     <animated.div key={key} style={props}>
//       <Switch location={location}>
//         <UserRoute path="/" exact component={Landing} />
//         <UserRoute path="/home" component={Home} />
//         <UserRoute path="/profile" auth component={Profile} />
//         <AuthRoute path="/login" component={Login} />
//         <AuthRoute path="/register" component={Register} />
//         <Redirect path="/admin" exact to="/admin/dashboard" />
//         <AdminRoute path="/admin/dashboard" component={Dashboard} />
//         <AdminRoute path="/admin/users" component={ListUsers} />
//         <AdminRoute path="/admin/categories" component={ListCategory} />
//         <AdminRoute path="/admin/requests" component={ListShopRequest} />
//         <Route path="*" component={NotFound} />
//       </Switch>
//     </animated.div>
//   ));
// };
