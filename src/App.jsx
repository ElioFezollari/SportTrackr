import { RouterProvider, createBrowserRouter } from "react-router-dom";

import StaticLayout from "./components/layout/StaticLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

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
      }
    ]
  }])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
