
import RootLayout from './components/RootLayout'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'

function App() {
  const browserRouterObj=createBrowserRouter([
    {
      path:"",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"form",
          element:<TaskForm/>
        },
        {
          path:"list",
          element:<TaskList/>
        },
        {
          path:"status",
          element:<TaskStats/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={browserRouterObj}/>
    </div>
  )
}

export default App