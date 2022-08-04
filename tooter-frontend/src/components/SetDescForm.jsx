import React from 'react';
import { Formik, Form} from 'formik';
import * as yup from 'yup';
import styles from "./SetDescForm.module.css"
import FormikField from "./FormikField";

const validationSchema = yup.object().shape({
    description: yup
        .string()
        .min(3)
        .max(200)
        .required('description is required'),

});


const SetDescForm = ({handleClick, initalDesc}) => (
    <div>
        <Formik
            initialValues={{ description: initalDesc}}
            validationSchema={validationSchema}
            onSubmit={handleClick}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <FormikField name="description" placeholder="Description" multi={true} long={true}  />
                    <button type="submit" disabled={isSubmitting} className={styles.submit}>Set Description</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default SetDescForm;