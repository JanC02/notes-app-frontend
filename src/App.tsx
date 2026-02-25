import { Outlet } from "react-router-dom"
import Notifications from "./components/ui/Notifications.tsx";

function App() {
  return (
    <div id='app' className='min-h-screen'>
        <Notifications />
      <Outlet />
    </div>
  )
}

export default App
