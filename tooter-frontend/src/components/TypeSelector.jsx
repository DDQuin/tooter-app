import styles from "./TypeSelector.module.css"


const TypeSelector = ({type, setType}) => {

    return (
        <div className={styles.container}>
            <TypeButton handleClick={() => setType("all")} name={"Toots"} isClicked={type === "all"} />
            <TypeButton handleClick={() => setType("likes")} name={"Likes"} isClicked={type === "likes"} />
            <TypeButton handleClick={() => setType("comments")} name={"Comments"} isClicked={type === "comments"} />
        </div>

    )
}

const TypeButton = ({name, isClicked, handleClick}) => {
    const typeStyle = isClicked ? styles.buttonTypeClicked: styles.buttonType
    return (
        <div >
            <button className={typeStyle} onClick={handleClick}>{name}
                {isClicked && <hr className={styles.line}></hr>}
            </button>
        </div>
    )
}


export default TypeSelector