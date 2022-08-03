import React from 'react';
import { Formik, Form} from 'formik';
import * as yup from 'yup';
import styles from "./SetDescForm.module.css"
import FormikField from "./FormikField";

const validationSchema = yup.object().shape({
    avatar: yup
        .string()
        .min(3)
        .max(200)
        .required('avatar url is required'),

});


const SetAvatarForm = ({handleClick, initalAvatar}) => (
    <div>
        <Formik
            initialValues={{ avatar: initalAvatar}}
            validationSchema={validationSchema}
            onSubmit={handleClick}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <FormikField name="avatar" placeholder="Avatar URL" long={true}  />
                    <button type="submit" disabled={isSubmitting} className={styles.submit}>Set Avatar</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default SetAvatarForm;