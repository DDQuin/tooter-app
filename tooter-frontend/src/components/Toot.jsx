import styles from "./Toot.module.css"
import dateString from "../utils/dateString";

const Toot = ({toot}) => {
    let avatar = toot.user.avatar
    if (!avatar) {
        avatar = "/person.png"
    }

    return (
        <div className={styles.container}>
            <div className={styles.topPart}>
                <img className={styles.avatar} src={avatar} alt={"avatar"}/>
                <span className={styles.name}>{toot.user.name}</span>
                <span className={styles.username}>@{toot.user.username}</span>
                <span className={styles.date}>{dateString(toot.createdAt)}</span>
            </div>
            <p className={styles.content}>
                {toot.content}
            </p>
            <div className={styles.interaction}>
                <div className={styles.likeCon}>
                    <button className={styles.button}><img  alt={"like"} className={styles.like} src="/like.png"/></button>
                    {toot.likes.length}
                </div>
                <div className={styles.commentCon}>
                    <button className={styles.button}><img alt={"comment"} className={styles.comment} src="/comment.png"/></button>
                    {toot.comments.length}
                </div>
            </div>
        </div>
    )
}



export default Toot;