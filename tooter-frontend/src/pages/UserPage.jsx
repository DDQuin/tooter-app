

import {useParams} from "react-router-dom";
import styles from "./UserPage.module.css";
import TootList from "../components/TootList";
import useUser from "../hooks/useUser";

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
            <h1>{user.name}</h1>
            <p>{user.description ? user.description : "No description has been set for the user!"}</p>
            <TootList toots={user.toots}/>
        </div>
    );
}

export default UserPage;