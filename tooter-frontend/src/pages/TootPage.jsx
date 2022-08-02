import TootList from "../components/TootList";
import styles from "./TootPage.module.css"
import useToots from "../hooks/useToots";
import useMe from "../hooks/useMe";

const TootPage = () => {
    const { toots } = useToots();
    const {me} = useMe()
    return (
        <div className={styles.container}>
            <h1>All Toots</h1>
            <TootList toots={toots} showLink={true} curUser={me}/>
        </div>
    );
}

export default TootPage;