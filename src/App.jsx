import { createContext, useState } from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import CreateProfile from './pages/CreateProfile'
import AddPhotos from './pages/AddPhotos'
import Home from './pages/Home'

export const UserContext = createContext()
function App() {
  const [user, setUser] = useState(null)
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createProfile' element={<CreateProfile />} />
        <Route path='/addphotos' element={<AddPhotos />} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </UserContext.Provider >
      <ToastContainer />
    </>
  )
}

export default App
