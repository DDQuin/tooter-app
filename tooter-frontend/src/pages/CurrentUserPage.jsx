
import styles from "./CurrentUserPage.module.css";
import TootList from "../components/TootList";

import UserCard from "../components/UserCard";
import {useState} from "react";
import TypeSelector from "../components/TypeSelector";
import CommentsList from "../components/CommentsList";
import useMe from "../hooks/useMe";
import useSetDescription from "../hooks/useSetDescription";
import SetDescForm from "../components/SetDescForm";
import useSetAvatar from "../hooks/useSetAvatar";
import SetAvatarForm from "../components/SetAvatarForm";

const CurrentUserPage = () => {
    const {me, loading} = useMe()
    const [type, setType] = useState("all")
    const [setDescription] = useSetDescription();
    const [setAvatar] = useSetAvatar();

    const handleAvatarChange = async (values) => {
        const {avatar} = values
        try {
            await setAvatar( {avatar} );
        } catch (e) {
            console.log(e);
        }
    }
    const handleClick = async (values) => {
        const {description} = values
        try {
            await setDescription( {description} );
        } catch (e) {
            console.log(e);
        }
    }
    if (loading) {
        return (
            <div className={styles.container}>
                <h1>Loading User</h1>
            </div>
        )
    }
    if (!me) {
        return (
            <div className={styles.container}>
                <h1>User not found!</h1>
            </div>
        )
    }
    let toots = null
    let comments = null
    if (type === "all") {
        toots = me.toots
    } else if (type === "likes") {
        toots = me.likes.map(like => like.toot)
    } else if (type === "comments") {
        comments = me.comments
    }
    return (
        <div className={styles.container}>
            <SetAvatarForm handleClick={handleAvatarChange} initalAvatar={me.avatar}/>
            <SetDescForm handleClick={handleClick} initalDesc={me.description}/>
            <UserCard user={me} curUser={me}/>
            <TypeSelector type={type} setType={setType}/>
            {toots && <TootList toots={toots} showLink={false} curUser={me}/>}
            {comments && <CommentsList comments={comments} tootLinkShown={true} userLinkShown={false}/>}
        </div>
    );
}

export default CurrentUserPage;