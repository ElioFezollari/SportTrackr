import { RouterProvider, createBrowserRouter } from "react-router-dom";

import StaticLayout from "./components/layout/staticlayout/StaticLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PersistLogin from "./components/PersistLogin";
import AuthContext, { AuthProvider } from "./context/AuthProvider";

import AppNavbar from "./components/layout/applayout/AppNavbar";
import AppLayout from "./components/layout/applayout/AppLayout";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import RequireAuth from "./components/RequireAuth";
import MyLeagues from "./pages/MyLeagues/MyLeagues";
import Dashboard from "./pages/Dashboard/Dashboard";
import MatchUpload from "./pages/Statistician/MatchUpload";
import HighlightUpload from "./pages/Statistician/HighlightUpload";
import League from "./pages/League/League";
import Users from "./pages/Users/Users";


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
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register/:token",
          element: <Register />,
        },
        {
          path:"/confirm-email",
          element:<ConfirmEmail/>
        },
        {
          children:[
            {
              path:"/app",
              element:<AppLayout/>,
              children: [
                {
                  path: "leagues",
                  element: <MyLeagues />,
                },
                {
                  path:"dashboard",
                  element: <Dashboard/>
                },
                {
                  path: "match-upload",
                  element:<MatchUpload/>
                },
                {
                  path:"leagues/:id",
                  element:<League/>
                },
                {
                  path:"hightlight-upload",
                  element:<HighlightUpload/>
                },
                {
                  path: "users",
                  element: <Users />,
                }
              ],
            }
          ]
        },
      ],
    }
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