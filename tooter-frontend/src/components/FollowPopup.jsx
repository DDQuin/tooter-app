import styles from "./FollowPopup.module.css"
import SimpleUser from "./SimpleUser";
import {Link} from "react-router-dom";

const FollowPopup = ({title, users, closePopup}) => {
    console.log(users)
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>{title}</h2>
                {users.map(user => {
                    return (
                        <>
                        <Link to={`/users/${user.id}`} className={styles.link}><SimpleUser user={user}/></Link>
                        <hr></hr>
                        </>
                    )
                })}
                <span className={styles.closeIcon} onClick={closePopup}>x</span>
            </div>
        </div>
    )
}


export default FollowPopup