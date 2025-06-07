import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Home.jsx'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import NotFound from './NotFound.jsx'

const router = createBrowserRouter([
  {path: "/", element: <Home/> },
  {path: "/dashboard", element: <Dashboard/> },
  {path: "/login", element: <Login/>},
  {path: "/signup", element: <SignUp/>},
  {path: "*", element: <NotFound/> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
