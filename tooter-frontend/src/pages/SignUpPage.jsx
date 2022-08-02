import styles from "./SignInPage.module.css"

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import SignUpForm from "../components/SignUpForm";
import useSignIn from "../hooks/useSignIn";


const SignUpPage = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const [isWrong, setWrong] = useState(false)
    const navigate = useNavigate();
    const handleClick = async (values) => {
        const { username, password, name } = values;
        try {
            // call the mutate function here with the right arguments
            await signUp({ username, password, name});
            await signIn({username, password})
            navigate("/", { replace: true });
        } catch (e) {
            setWrong(true)
            console.log(e);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Sign Up</h1>
            <SignUpForm handleClick={handleClick} isWrong={isWrong}/>
        </div>
    );
}

export default SignUpPage;