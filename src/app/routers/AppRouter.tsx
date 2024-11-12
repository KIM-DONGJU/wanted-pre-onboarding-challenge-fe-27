import { createBrowserRouter, redirect, RouteObject, RouterProvider } from "react-router-dom"

import { SignUp, TodoPage, SignIn } from "@/pages";
import {
  localStorageController,
  MAIN,
  SIGN_IN,
  SIGN_UP 
 } from "@/shared";

const authLoader = () => {
  if (!localStorageController.getItem("authToken")) {
    return redirect(SIGN_IN)
  };

  return null;
}

const routes: RouteObject[] = [
  {
    path: MAIN,
    element: <TodoPage />,
    loader: authLoader
  },
  {
    path: SIGN_UP,
    element: <SignUp />
  },
  {
    path: SIGN_IN,
    element: <SignIn />
  }
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
    v7_partialHydration: true,
  }
});

export function AppRouter() {
  return <RouterProvider router={router} future={
    {
      v7_startTransition: true,
    }
  }/>
}