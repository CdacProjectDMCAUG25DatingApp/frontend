import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/home";
import Chat from "./Pages/chat";
import Subscribe from "./Pages/Subscribe";
import EditProfile from "./Pages/EditProfile";
import Message from "./Pages/Message";
import Preferences from "./Pages/preferences";
import Settings from "./Pages/settings";
import Matches from "./Pages/Matches";
import Likes from "./Pages/Likes";
import "./App.css";


function App() {
return (
<Router>
<div className="app-container">
<Sidebar />
<div className="page-container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/chat" element={<Chat />} />
<Route path="/Subscribe" element={<Subscribe />} />
<Route path="/Edit Profile" element={<EditProfile />} />
<Route path="/Message" element={<Message />} />
<Route path="/preferences" element={<Preferences />} />
<Route path="/settings" element={<Settings />} />
<Route path="/likes" element={<Likes />} />
<Route path="/matches" element={<Matches />} />
</Routes>
</div>
</div>
</Router>
);
}

export default App;