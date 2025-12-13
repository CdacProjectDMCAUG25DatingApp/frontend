import { createContext, useState } from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import CreateProfile from './pages/CreateProfile'
import AddPhotos from './pages/AddPhotos'
import Home from './pages/Home'
import Chat from './Home Page Components/src/Pages/chat'
import Subscribe from "./Home Page Components/src/Pages/Subscribe";
import EditProfile from "./Home Page Components/src/Pages/EditProfile";
import Message from "./Home Page Components/src/Pages/Message";
import Preferences from "./Home Page Components/src/Pages/preferences";
import Settings from "./Home Page Components/src/Pages/settings";
import Matches from "./Home Page Components/src/Pages/Matches";
import Likes from "./Home Page Components/src/Pages/Likes";
import CenterCard from './Home Page Components/src/Components/CentreCard'
import UserPreferences from './pages/UserPreferences'


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
          <Route path='/preferences' element={<UserPreferences />} />
          <Route path='/home' element={<Home />}>
            <Route path="" element={<CenterCard />} />
            <Route path="viewProfile" element={<EditProfile />} />
            <Route path="message" element={<Message />} />
            <Route path="chat" element={<Chat />} />
             <Route path="Subscribe" element={<Subscribe />} />
            <Route path="EditProfile" element={<EditProfile />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="settings" element={<Settings />} />
            <Route path="likes" element={<Likes />} />
            <Route path="matches" element={<Matches />} />
          </Route>
        </Routes>
      </UserContext.Provider >
      <ToastContainer />
    </>
  )
}

export default App
