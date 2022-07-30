import TootList from "../components/TootList";
import styles from "./TootPage.module.css"
import useToots from "../hooks/useToots";

const TootPage = () => {
    const { toots } = useToots();
    return (
        <div className={styles.container}>
            <h1>All Toots</h1>
            <TootList toots={toots}/>
        </div>
    );
}

export default TootPage;