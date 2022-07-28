import styles from "./AboutPage.module.css"

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>About</h1>
            <p className={styles.header}>
                In eu iaculis sapien. Nunc maximus leo at lacus suscipit, non condimentum libero semper.
                Nam at aliquam neque. Sed rhoncus fermentum mattis. Nulla lobortis augue vitae odio molestie viverra.
                Duis et urna et orci porttitor rhoncus. Integer nulla elit, volutpat et fringilla nec, pharetra nec lorem.
                Etiam at dapibus lorem, sed tempus nisl. Phasellus quis risus tincidunt, pretium erat in, suscipit diam.
                Integer posuere elementum ante vel molestie. Donec placerat suscipit magna sed mollis.
                Pellentesque efficitur lacus non dolor dignissim tincidunt.
                Vestibulum efficitur at enim ut feugiat. Donec scelerisque ac sapien in fermentum.
            </p>
        </div>
    );
}

export default AboutPage;