import { RouterProvider, createBrowserRouter } from "react-router-dom";

import StaticLayout from "./components/layout/StaticLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";

function App() {

  const router = createBrowserRouter([{
    path:'/',
    element:<StaticLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/about-us',
        element:<About/>
      },
    ],
  },
  {
    path:"/login",
    element:<Login/>
  }
])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
