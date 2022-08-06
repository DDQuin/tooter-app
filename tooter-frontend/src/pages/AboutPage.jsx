import styles from "./AboutPage.module.css"

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>About</h1>
            <p className={styles.par}>
                This is a twitter clone made for educational purposes to put all the knowledge learned from the <a href={"https://fullstackopen.com/en/"}>FullStackOpen</a> course
                into a project. More details of implementation on <a href={"https://github.com/DDQuin/tooter-app"}>GitHub</a>.
            </p>
            <ul>
                <li> You can sign up and set your avatar and description.</li>
                <li>Create toots aswell as like other toots and comment on them.</li>
                <li>View other user profiles and look at their likes and comments </li>
                <li>Follow other users and view follow list.</li>
                <li>Filter toots shown</li>
            </ul>

        </div>
    );
}

export default AboutPage;