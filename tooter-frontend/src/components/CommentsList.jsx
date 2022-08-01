import CommentCard from "./CommentCard"
import styles from "./TootList.module.css"


const CommentsList = ({comments, userLinkShown, tootLinkShown}) => {
    if (!comments) {
        return (
            <div>
                loading
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {comments.map(comment => {
                return (
                    <>
                        <CommentCard comment={comment} userLinkShown={userLinkShown} tootLinkShown={tootLinkShown   }/>
                        <hr></hr>
                    </>
                )
            })}
        </div>
    )

}

export default CommentsList;