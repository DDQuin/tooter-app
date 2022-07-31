import styles from "./UserCard.module.css"
import {useState} from "react";
import FollowPopup from "./FollowPopup";
import Avatar from "./Avatar";



const UserCard = ({user}) => {
    const [popupType, setPopupType] = useState("off")
    return (
        <div className={styles.container}>
            <div className={styles.topPart}>
                <Avatar avatar={user.avatar} width={64} height={64} />
                <span className={styles.name}>{user.name}</span>
                <span className={styles.username}>@{user.username}</span>
            </div>
            <p className={styles.content}>
                {user.description ? user.description : "The user does not have a description set!"}
            </p>
            <div className={styles.interaction}>
                <button className={styles.follow}>Follow</button>
                <button className={styles.following} onClick={() => setPopupType("following")}>Following {user.following.length}</button>
                <button className={styles.followedBy} onClick={() => setPopupType("followedBy")}>Followed By {user.followedBy.length}</button>
                {popupType === "following" && <FollowPopup title={"Following"} users={user.following} closePopup={() => setPopupType("off")}/> }
                {popupType === "followedBy" && <FollowPopup title={"Followed By"} users={user.followedBy} closePopup={() => setPopupType("off")}/> }
            </div>
        </div>
    )
}



export default UserCard;