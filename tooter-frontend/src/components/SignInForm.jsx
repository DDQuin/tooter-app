import React from 'react';
import { Formik, Form} from 'formik';
import * as yup from 'yup';
import styles from "./SignInForm.module.css"
import FormikField from "./FormikField";

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3)
        .max(20)
        .required('Username is required'),
    password: yup
        .string()
        .min(3)
        .max(20)
        .required('Password is required'),
});


const SignInForm = ({handleClick, isWrong}) => (
    <div>
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleClick}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <FormikField name="username" placeholder="Username"   />
                    <FormikField name="password" placeholder="Password" type="password"  />
                    {isWrong && <span className={styles.error}>Wrong Details</span>}
                    <button type="submit" disabled={isSubmitting} className={styles.submit}>Sign In</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default SignInForm;