import styles from "./TypeSelector.module.css"


const TypeSelector = ({type, setType}) => {

    return (
        <div className={styles.container}>
            <TypeButton handleClick={() => setType("all")} name={"All"} isClicked={type === "all"} />
            <TypeButton handleClick={() => setType("likes")} name={"Likes"} isClicked={type === "likes"} />
            <TypeButton handleClick={() => setType("comments")} name={"Comments"} isClicked={type === "comments"} />
        </div>

    )
}

const TypeButton = ({name, isClicked, handleClick}) => {
    const typeStyle = isClicked ? styles.buttonTypeClicked: styles.buttonType
    return (
        <button className={typeStyle} onClick={handleClick}>{name}</button>
    )
}


export default TypeSelector