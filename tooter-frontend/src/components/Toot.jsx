import styles from "./Toot.module.css"
import dateString from "../utils/dateString";
import {useState} from "react";
import {Link} from "react-router-dom";
import Avatar from "./Avatar";
import Popup from "./Popup";

const Toot = ({toot, showLink, curUser}) => {
    let [likeHover , setLikeHover] = useState(false)
    let likeUrl = likeHover ? "/images/like_outline.png" : "/images/like.png"
    if (curUser) {
        for (let like of curUser.likes) {
            if (like.toot.id === toot.id) {
                likeUrl = "/images/like_clicked.png"
            }
        }
    }
    let [commentHover , setCommentHover] = useState(false)
    let commentUrl = commentHover ? "/images/comment_outline.png" : "/images/comment.png"
    const [isPopupShown, setShowPopup] = useState(false)
    const handleLike = () => {
        if (!curUser) {
            setShowPopup(true)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.topPart}>
                <Avatar avatar={toot.user.avatar}/>
                <span className={styles.name}>{toot.user.name}</span>
                {showLink ?
                    <Link to={`/users/${toot.user.id}`} className={styles.username}>@{toot.user.username}</Link> :
                    <span to={`/users/${toot.user.id}`} className={styles.username}>@{toot.user.username}</span>
                }
                <span className={styles.date}>{dateString(toot.createdAt)}</span>
            </div>
            <p className={styles.content}>
                {toot.content}
            </p>
            <div className={styles.interaction}>
                <div className={styles.likeCon}>
                    <button className={styles.button} onClick={handleLike}>
                        <img  alt={"like"} className={styles.like} src={likeUrl} onMouseOver={() => setLikeHover(true)} onMouseLeave={() => setLikeHover(false)}/>
                    </button>
                    {isPopupShown && <Popup closePopup={() => setShowPopup(false)}><span>You are not logged in!</span></Popup>}
                    {toot.likes.length}
                </div>
                <div className={styles.commentCon}>
                    <Link to={`/toot/${toot.id}`} className={styles.username}>
                    <button className={styles.button}>
                        <img alt={"comment"} className={styles.comment} src={commentUrl} onMouseOver={() => setCommentHover(true)} onMouseLeave={() => setCommentHover(false)}/>
                    </button>
                    </Link>
                    {toot.comments.length}
                </div>
            </div>
        </div>
    )
}



export default Toot;