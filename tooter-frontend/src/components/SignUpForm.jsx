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
    name: yup
        .string()
        .min(3)
        .max(20)
        .required('Name is required'),
    password: yup
        .string()
        .min(3)
        .max(20)
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required('Password confirm is required')

});


const SignInForm = ({handleClick, isWrong}) => (
    <div>
        <Formik
            initialValues={{ username: '', password: '', name: '', passwordConformation: '' }}
            validationSchema={validationSchema}
            onSubmit={handleClick}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <FormikField name="username" placeholder="Username"  />
                    <FormikField name="name" placeholder="Name"  />
                    <FormikField name="password" placeholder="Password" type="password"  />
                    <FormikField name="passwordConfirmation" placeholder="Password Confirmation" type="password"  />
                    {isWrong && <span className={styles.error}>Wrong Details</span>}
                    <button type="submit" disabled={isSubmitting} className={styles.submit}>Sign Up</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default SignInForm;