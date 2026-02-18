import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Home.jsx'
import Dashboard from './Dashboard.jsx'
import DashboardHome from './DashboardHome.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Applications from './Applications.jsx'
import Interviews from './Interviews.jsx'
import Settings from './Settings.jsx'
import Templates from './Templates.jsx'
import LearnMore from './LearnMore.jsx'
import NotFound from './NotFound.jsx'

const router = createBrowserRouter([
  {path: "/", element: <Home/> },
  {path: "/dashboard", 
   element: <Dashboard/>,
    children: [
      {index: true, element: <DashboardHome/>}, /* testing: 2/17/2026 */
      {path: "applications", element: <Applications/>}, /* testing: 2/2/2026 */
      {path: "interviews", element: <Interviews/> }, /* testing: 2/2/2026 */
      {path: "settings", element: <Settings/> }, /* testing: 2/5/2026 */
      {path: "templates", element: <Templates/> },
    ],
   },  /* testing: 2/1/2026 */
  {path: "/login", element: <Login/>},
  {path: "/signup", element: <SignUp/>},
  {path: "/learn-more", element: <LearnMore/>},
  {path: "*", element: <NotFound/> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
