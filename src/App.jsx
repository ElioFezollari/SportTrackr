import { RouterProvider, createBrowserRouter } from "react-router-dom";

import StaticLayout from "./components/layout/StaticLayout";
import Home from "./pages/Home/Home";

function App() {

  const router = createBrowserRouter([{
    path:'/',
    element:<StaticLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
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
