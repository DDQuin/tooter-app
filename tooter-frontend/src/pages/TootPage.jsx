import TootList from "../components/TootList";
import styles from "./TootPage.module.css"

const TootPage = () => {
    return (
        <div className={styles.container}>
            <h1>All Toots</h1>
            <TootList/>
        </div>
    );
}

export default TootPage;