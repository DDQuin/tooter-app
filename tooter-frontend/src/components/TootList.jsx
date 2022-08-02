import Toot from "./Toot";
import styles from "./TootList.module.css"

const TootList = ({toots, showLink, curUser}) => {
    if (!toots) {
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {toots.map(toot => <Toot key={toot.id} toot={toot} showLink={showLink} curUser={curUser}/>)}
        </div>
    )

}

export default TootList;