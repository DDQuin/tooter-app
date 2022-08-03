import {useField} from "formik";
import styles from "./FormikField.module.css"

const FormikField = ({ name, long, multi, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    let style = long ? styles.inputLong : styles.input
    if (showError) {
        style = styles.inputWrong
    }
    const defaultProps = {
        type: "text",
        onChange: (event) => helpers.setValue(event.target.value),
        onBlur: () => helpers.setTouched(true),
        value: field.value,
        className: style
    }
    return (
        <>
            {multi ? <textarea {...defaultProps} {...props} maxlength="200"/> : <input {...defaultProps} {...props}/>}
            {showError && <span className={styles.errorText}>{meta.error}</span>}
        </>
    );
};

export default FormikField