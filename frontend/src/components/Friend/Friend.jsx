import "./Friend.css";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App/App";

export default function Friend({ username, profile, setProfile }) {
    const { user, setErrorMessage } = useContext(UserContext);

    const handleFriend = async () => {
        const url = profile.friend
            ? "http://localhost:3000/unfriend"
            : "http://localhost:3000/friend";
        try {
            const response = await axios.post(
                url,
                { username },
                { withCredentials: true, validateStatus: () => true } 
            );

            if (response.status === 200) {
                setProfile({ ...profile, friend: !profile.friend });
            }

            if (response.status === 404 || response.status === 409) {
                setErrorMessage(response.data.error);
            }

            if (response.status === 500) {
                setErrorMessage(
                    `${response.statusText}: Please try again later.`
                );
            }
        } catch (error) {
            setErrorMessage(`${error.message}: Please try again later.`);
        }
    }

    return (
        <div className={username === user.username ? "hidden" : "friend"}>
            <button onClick={handleFriend}>
                {profile.friend ? "Remove Friend" : "Add Friend"}
            </button>
        </div>
    )
}