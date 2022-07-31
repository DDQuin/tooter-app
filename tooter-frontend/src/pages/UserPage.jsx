

import {useParams} from "react-router-dom";
import styles from "./UserPage.module.css";
import TootList from "../components/TootList";
import useUser from "../hooks/useUser";
import UserCard from "../components/UserCard";
import {useState} from "react";
import TypeSelector from "../components/TypeSelector";

const UserPage = () => {
    const { id } = useParams()
    const {user, loading} = useUser(id)
    const [type, setType] = useState("all")
    if (loading) {
        return (
            <div className={styles.container}>
                <h1>Loading User</h1>
            </div>
        )
    }
    if (!user) {
        return (
            <div className={styles.container}>
                <h1>User not found!</h1>
            </div>
        )
    }
    let toots = type === "all" ? user.toots : user.likes.map(like => like.toot)
    return (
        <div className={styles.container}>
            <UserCard user={user}/>
            <TypeSelector type={type} setType={setType}/>
            <TootList toots={toots} showLink={false}/>
        </div>
    );
}

export default UserPage;