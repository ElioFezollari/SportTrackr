import { RouterProvider, createBrowserRouter } from "react-router-dom";

import StaticLayout from "./components/layout/StaticLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import AuthContext, { AuthProvider } from "./context/AuthProvider";

function App() {
  const router = createBrowserRouter([
    {
      element: <PersistLogin />,
      children: [
        {
          path: "/",
          element: <StaticLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/about-us",
              element: <About />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
