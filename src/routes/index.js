import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
  //Home Page
  {
    path: "",
    element: lazy(() => import("./../containers/Home")),
    nested: [
      {
        path: "",
        element: lazy(() => import("./../containers/Home/HomePage")),
      },
      {
        path: "detail",
        element: lazy(() => import("./../containers/Home/DetailMovie")),
      },
    ],
  },
  //Auth Page
  {
    path: "auth",
    element: lazy(() => import("./../containers/AuthPage")),
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
