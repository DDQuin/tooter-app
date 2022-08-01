import styles from "./CommentCard.module.css"
import Avatar from "./Avatar";
import dateString from "../utils/dateString";
import {Link} from "react-router-dom";


//add replying to if given link boolean
const CommentCard = ({comment, userLinkShown, tootLinkShown}) => {
    return (
        <div className={styles.container}>
            <div className={styles.topPart}>
                <Avatar avatar={comment.user.avatar} width={64} height={64} />
                <span className={styles.name}>{comment.user.name}</span>
                {userLinkShown ?
                    <Link to={`/users/${comment.user.id}`} className={styles.username}>@{comment.user.username}</Link> :
                    <span className={styles.username}>@{comment.user.username}</span>
                }
                <span className={styles.date}>{dateString(comment.createdAt)}</span>
                {tootLinkShown &&
                    <Link to={`/toot/${comment.toot.id}`} className={styles.username}>replying to @{comment.toot.user.username}</Link>
                }

            </div>
            <p className={styles.content}>
                {comment.content}
            </p>
        </div>
    )
}



export default CommentCard;