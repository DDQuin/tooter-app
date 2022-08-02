import {useField} from "formik";
import styles from "./FormikField.module.css"

const FormikField = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    let style = styles.input
    if (showError) {
        style = styles.inputWrong
    }
    return (
        <>
            <input
                type="text"
                onChange={(event) => helpers.setValue(event.target.value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                className={style}
                {...props}
            />
            {showError && <span className={styles.errorText}>{meta.error}</span>}
        </>
    );
};

export default FormikField