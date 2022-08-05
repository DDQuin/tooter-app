import React from 'react';
import { Formik, Form} from 'formik';
import * as yup from 'yup';
import styles from "./SetDescForm.module.css"
import FormikField from "./FormikField";

const validationSchema = yup.object().shape({
    content: yup
        .string()
        .min(3)
        .max(200)
        .required('toot content is required'),

});


const CreateTootForm = ({handleClick}) => (
    <div>
        <Formik
            initialValues={{ content: ""}}
            validationSchema={validationSchema}
            onSubmit={handleClick}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <FormikField name="content" placeholder="Content" multi={true} long={true}  />
                    <button type="submit" disabled={isSubmitting} className={styles.submit}>Create Toot</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default CreateTootForm;