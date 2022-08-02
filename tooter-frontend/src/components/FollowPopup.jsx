import styles from "./FollowPopup.module.css"
import SimpleUser from "./SimpleUser";
import {Link} from "react-router-dom";
import Popup from "./Popup";

const FollowPopup = ({title, users, closePopup}) => {
    console.log(users)
    return (
        <Popup closePopup={closePopup}>
            <h2>{title}</h2>
            {users.map(user => {
                return (
                    <>
                        <Link to={`/users/${user.id}`} className={styles.link}><SimpleUser user={user}/></Link>
                        <hr></hr>
                    </>
                )
            })}
        </Popup>
    )
}


export default FollowPopup