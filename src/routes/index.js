import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
  //Home Page
  {
    path: "",
    element: lazy(() => import("./../containers/Home")),
    nested: [
      {
        path: "user",
        element: lazy(() => import("./../containers/Home/User/ListUser")),
      },
      {
        path: "user/createuser",
        element: lazy(() => import("./../containers/Home/User/CreateUser")),
      },
      {
        path: "user/updateuser/:id",
        element: lazy(() => import("./../containers/Home/User/UpdateUser")),
      },
      {
        path: "movie",
        element: lazy(() => import("./../containers/Home/Movie/ListMovie")),
      },
      {
        path: "movie/createmovie",
        element: lazy(() => import("./../containers/Home/Movie/CreateMovie")),
      },
      {
        path: "movie/updatemovie/:id",
        element: lazy(() => import("./../containers/Home/Movie/UpdateMovie")),
      },
    ],
  },
  //Auth Page
  {
    path: "auth",
    element: lazy(() => import("./../containers/AuthPage")),
    nested: [
      {
        path: "login",
        element: lazy(() => import("./../containers/AuthPage/LoginPage")),
      },
    ],
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route
              key={route.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export { renderRoutes };
