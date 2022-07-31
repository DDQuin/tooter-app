import styles from "./SimpleUser.module.css"
import Avatar from "./Avatar";


const SimpleUser = ({user}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Avatar avatar={user.avatar}/>
                <span className={styles.name}>{user.name} </span>
                <span className={styles.username}>@{user.username}</span>
            </div>
            {user.description}

        </div>
    )

}

export default SimpleUser