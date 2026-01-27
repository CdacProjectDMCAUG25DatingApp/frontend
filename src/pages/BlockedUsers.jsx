import { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import { utils } from "../utils";

export default function BlockedUsers() {
    const [blockedList, setBlockedList] = useState([]);

    useEffect(() => {
        loadBlockedUsers();
    }, []);

    const loadBlockedUsers = async () => {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`${config.BASE_URL}/settings/blocked-list`, {
            headers: { token }
        });
        console.log(res.data.data)
        setBlockedList(res.data.data || []);
    };

    const unblockUser = async (uid) => {
        const token = sessionStorage.getItem("token");
        await axios.delete(
            `${config.BASE_URL}/settings/unblock/${uid}`,
            { headers: { token } }
        );

        setBlockedList((prev) => prev.filter((u) => u.uid !== uid));
    };


    return (
        <div className="container py-4">
            <h2 className="fw-bold text-white mb-4">Blocked Users</h2>

            {blockedList.length === 0 && (
                <p className="text-secondary">No blocked users</p>
            )}

            <div className="row">
                {blockedList.map((u) => (
                    <div key={u.uid} className="col-12 mb-3">
                        <div className="card bg-dark text-white p-3 d-flex flex-row align-items-center">

                            <img
                                src={utils.urlConverter(u.photo_url)}
                                alt=""
                                style={{ width: 60, height: 60, borderRadius: "50%", marginRight: 15 }}
                            />

                            <div className="flex-grow-1">
                                <h5 className="m-0">{u.user_name}</h5>
                                <p className="m-0 text-secondary">{u.location}</p>
                            </div>

                            <button
                                className="btn btn-outline-danger"
                                onClick={() => unblockUser(u.uid)}
                            >
                                Unblock
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
