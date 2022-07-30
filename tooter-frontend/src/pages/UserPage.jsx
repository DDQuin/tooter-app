

import {useParams} from "react-router-dom";
import styles from "./UserPage.module.css";
import TootList from "../components/TootList";
import useUser from "../hooks/useUser";
import UserCard from "../components/UserCard";

const UserPage = () => {
    const { id } = useParams()
    const {user, loading} = useUser(id)
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
    return (
        <div className={styles.container}>
            <UserCard user={user}/>
            <TootList toots={user.toots} showLink={false}/>
        </div>
    );
}

export default UserPage;