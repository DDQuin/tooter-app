import styles from "./SignInPage.module.css"
import useSignIn from '../hooks/useSignIn';
import SignInForm from "../components/SignInForm";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const SignInPage = () => {
    const [signIn] = useSignIn();
    const [isWrong, setWrong] = useState(false)
    const navigate = useNavigate();
    const handleClick = async (values) => {
        const { username, password } = values;
        try {
            // call the mutate function here with the right arguments
            const {data} = await signIn({ username, password});
            console.log(data)
            navigate("/", { replace: true });
        } catch (e) {
            setWrong(true)
            console.log(e);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Sign In</h1>
            <SignInForm handleClick={handleClick} isWrong={isWrong}/>
        </div>
    );
}

export default SignInPage;