import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LeadList from './pages/LeadList.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AddNewLead from './pages/AddNewLead.jsx'
import Agent from './pages/Agent.jsx'
import AddSalesAgent from './pages/AddSalesAgent.jsx'
import LeadsStatus from './pages/LeadsStatus.jsx'
import LeadDetails from './pages/LeadDetails.jsx'
import Report from './pages/Report.jsx'
import Settings from './pages/Settings.jsx'
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/list",
    element: <LeadList />
  },
  {
    path:"/addlead",
    element: <AddNewLead />
  },
  {
    path:"/agent",
    element:<Agent/>
  },
  {
    path:"/addagent",
    element:<AddSalesAgent />
  },{
    path:"leads/:stat",
    element:<LeadsStatus />
  },{
    path:"leads/id/:id",
    element:<LeadDetails/>
  },{
    path:"/report",
    element:<Report />
  },{
    path:"/settings",
    element: <Settings />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
)
