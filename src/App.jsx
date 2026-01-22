import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Workspace from "./pages/Workspace"
import { useAuthContext } from "./context/AuthContext"
import Register from "./pages/Register";


function App() {
   const {authToken} = useAuthContext();

  if(!authToken){
    return (<div className='h-screen w-screen flex bg-gray-50'>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Login/>}/>
      </Routes>
    </div>)
  }
  
  return (
    <Workspace/>
  )
}

export default App
