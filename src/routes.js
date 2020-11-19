// import { lazy } from "react";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Category from "@material-ui/icons/CategorySharp";
import People from "@material-ui/icons/People";
import { StorefrontTwoTone } from "@material-ui/icons";

// import Request from "@material-ui/icons/ReceiptTwoTone";
// const DashboardPage = lazy(() => import("views/Admin/Dashboard"));
// const ListCategory = lazy(() => import("views/Admin/ListCategory"));
// const ListShops = lazy(() => import("views/Admin/ListShops"));
// const ListUsers = lazy(() => import("views/Admin/ListUsers"));

const dashboardRoutes = [
  //  ADMIN LAYOUT
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    // component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: People,
    // component: ListUsers,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: Category,
    // component: ListCategory,
    layout: "/admin",
  },
  {
    path: "/shops",
    name: "Shops",
    icon: StorefrontTwoTone,
    // component: ListShops,
    layout: "/admin",
  },
  // {
  //   path: "/user/:id",
  //   name: "User",
  //   icon: Person,
  //   component: UserProfile,
  //   hidden: true,
  //   layout: "/admin",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
