import useToot from "../hooks/useToot";
import styles from "./CommentsPage.module.css"
import Toot from "../components/Toot";
import {useParams} from "react-router-dom";
import CommentsList from "../components/CommentsList";
import useMe from "../hooks/useMe";

const CommentsPage = () => {
    const { id } = useParams()
    const { me } = useMe()
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
            <Toot showLink={true} toot={toot} curUser={me}/>
            <CommentsList comments={toot.comments} userLinkShown={true} tootLinkShown={false}/>
        </div>
    );
}

export default CommentsPage;