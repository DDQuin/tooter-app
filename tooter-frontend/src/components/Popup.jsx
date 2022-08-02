import styles from "./Popup.module.css"

const Popup = (props) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                {props.children}
                <span className={styles.closeIcon} onClick={props.closePopup}>x</span>
            </div>
        </div>
    )
}


export default Popup