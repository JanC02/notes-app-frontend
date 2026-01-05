import { Outlet } from "react-router-dom"

function App() {
  return (
    <div id='app' className='min-h-screen'>
      <Outlet />
    </div>
  )
}

export default App
