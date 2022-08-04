import styles from "./UserCard.module.css"
import {useState} from "react";
import FollowPopup from "./FollowPopup";
import Avatar from "./Avatar";
import Popup from "./Popup";
import useFollowUser from "../hooks/useFollowUser";



const UserCard = ({user, curUser}) => {
    const [popupType, setPopupType] = useState("off")
    const [isPopupShown, setShownPopup ] = useState(false)
    const [followUser] = useFollowUser()
    const handleFollow = () => {
        if (!curUser) {
            setShownPopup(true)
        } else {
            followUser(user.id)
        }
    }
    let isFollowedByCurUser = false
    let showFollow = true
    if (curUser) {
        if (curUser.id === user.id ) {
            showFollow = false
        } else {
            for (let userFollow of curUser.following) {
                if (userFollow.id === user.id) {
                    isFollowedByCurUser = true
                }
            }
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.topPart}>
                <Avatar avatar={user.avatar} width={64} height={64} />
                <span className={styles.name}>{user.name}</span>
                <span className={styles.username}>@{user.username}</span>
            </div>
            <div className={styles.content}>
                {user.description ? user.description : "The user does not have a description set!"}
            </div>
            <div className={styles.interaction}>
                {showFollow && <button className={styles.follow} onClick={handleFollow}>{isFollowedByCurUser ? "Followed" : "Follow"}</button>}
                {isPopupShown && <Popup closePopup={() => setShownPopup(false)}><span>You are not logged in!</span></Popup>}
                <button className={styles.following} onClick={() => setPopupType("following")}>Following {user.following.length}</button>
                <button className={styles.followedBy} onClick={() => setPopupType("followedBy")}>Followed By {user.followedBy.length}</button>
                {popupType === "following" && <FollowPopup title={"Following"} users={user.following} closePopup={() => setPopupType("off")}/> }
                {popupType === "followedBy" && <FollowPopup title={"Followed By"} users={user.followedBy} closePopup={() => setPopupType("off")}/> }
            </div>
        </div>
    )
}



export default UserCard;