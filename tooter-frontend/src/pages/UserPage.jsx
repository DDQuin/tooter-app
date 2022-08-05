

import {useParams} from "react-router-dom";
import styles from "./UserPage.module.css";
import TootList from "../components/TootList";
import useUser from "../hooks/useUser";
import UserCard from "../components/UserCard";
import {useState} from "react";
import TypeSelector from "../components/TypeSelector";
import CommentsList from "../components/CommentsList";
import useMe from "../hooks/useMe";

const UserPage = () => {
    const { id } = useParams()
    const {user, loading} = useUser(id)
    const {me} = useMe()
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
    let toots = null
    let comments = null
    if (type === "all") {
        toots = user.toots
    } else if (type === "likes") {
        toots = user.likes.map(like => like.toot)
    } else if (type === "comments") {
        comments = user.comments
    }
    return (
        <div className={styles.container}>
            <UserCard user={user} curUser={me}/>
            <TypeSelector type={type} setType={setType}/>
            {toots && <TootList toots={toots} showLink={type === "likes"} curUser={me}/>}
            {comments && <CommentsList comments={comments} tootLinkShown={true} userLinkShown={false}/>}
        </div>
    );
}

export default UserPage;