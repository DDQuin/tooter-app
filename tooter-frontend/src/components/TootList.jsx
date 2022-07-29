import useToots from "../hooks/useToots";
import Toot from "./Toot";
import styles from "./TootList.module.css"

const TootList = () => {
    const { toots } = useToots();
    if (!toots) {
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {toots.map(toot => <Toot key={toot.id} toot={toot}/>)}
        </div>
    )

}

export default TootList;