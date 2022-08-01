import useToot from "../hooks/useToot";
import styles from "./CommentsPage.module.css"
import Toot from "../components/Toot";
import {useParams} from "react-router-dom";
import CommentsList from "../components/CommentsList";

const CommentsPage = () => {
    const { id } = useParams()
    const {toot, loading} = useToot(id)
    if (loading) {
        return (
            <div className={styles.container}>
                <h1>Loading Toot</h1>
            </div>
        )
    }
    if (!toot) {
        return (
            <div className={styles.container}>
                <h1>Toot not found!</h1>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <h1>Comments</h1>
            <Toot showLink={true} toot={toot}/>
            <CommentsList comments={toot.comments} userLinkShown={true} tootLinkShown={false}/>
        </div>
    );
}

export default CommentsPage;