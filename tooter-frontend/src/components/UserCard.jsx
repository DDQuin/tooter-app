import styles from "./UserCard.module.css"



const UserCard = ({user}) => {
    let avatar = user.avatar
    if (!avatar) {
        avatar = "/images/person.png"
    }
    return (
        <div className={styles.container}>
            <div className={styles.topPart}>
                <img className={styles.avatar} src={avatar} alt={"avatar"}/>
                <span className={styles.name}>{user.name}</span>
                <span className={styles.username}>@{user.username}</span>
            </div>
            <p className={styles.content}>
                {user.description ? user.description : "The user does not have a description set!"}
            </p>
            <div className={styles.interaction}>
                <button className={styles.follow}>Follow</button>
            </div>
        </div>
    )
}



export default UserCard;