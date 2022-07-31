import styles from "./Avatar.module.css";

const Avatar = ({avatar, width, height}) => {
    if (!avatar) {
        avatar = "/images/person.png"
    }
    if (!width) width = 48
    if (!height) height = 48
    return (
        <img className={styles.avatar} src={avatar} alt={"avatar"} width={width} height={height}/>
    )
}

export default Avatar