import { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import { useNavigate } from "react-router-dom";
import UserLikeCard from "../Components/UserLikeCard";
import { connectSocket } from "../socket";
export default function ChatHome() {
  const [chatUsers, setChatUsers] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    connectSocket();
    loadChatUsers();
  }, []);

  const loadChatUsers = async () => {
    const res = await axios.get(`${config.BASE_URL}/chat/chat/list`, {
      headers: { token },
    });
    console.log(res.data.data)
    setChatUsers(res.data.data || []);
  };

  const openChat = (user) => {
    navigate("/home/messages", {
      state: { candidateToken: user.token, user },
    });
  };

  return (
    <div className="px-3 mt-3">
      <h3 className="text-center text-white fw-bold mb-3">Messages</h3>

      {chatUsers.map((user, i) => (
        <div 
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => openChat(user)}
        >
          <UserLikeCard user={user} onChat/>
        </div>
      ))}
    </div>
  );
}
