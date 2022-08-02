import {
    Link, useNavigate, useLocation
} from "react-router-dom"
import style from "./Navbar.module.css"
import useMe from "../hooks/useMe";
import {useApolloClient} from "@apollo/client/react";
import Avatar from "./Avatar";
const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const {me} = useMe()
    return (
        <nav className={style.navbar}>
            <button  onClick={() => navigate(-1)} className={style.buttonArrow}><img className={style.arrow} src={"/images/arrow.png"} alt={"Arrow"}/></button>
            <NavLink path={"/toots"} name={"Home"} isClicked={location.pathname.includes("toots")}/>
            <NavLink path={"/about"} name={"About"} isClicked={location.pathname.includes("about")}/>
            {!me && <NavLink path={"/signin"} name={"Sign In"} isClicked={location.pathname.includes("signin")}/>}
            {!me && <NavLink path={"/signup"} name={"Sign Up"} isClicked={location.pathname.includes("signup")}/>}
            {me && <SignOutButton/>}
            {me && <Avatar avatar={me.avatar} width={58} height={58}/>}
        </nav>
    );
}

const NavLink = ({path, name, isClicked}) => {
    const navStyle = isClicked ? style.linkClicked: style.link
    return (
        <Link to={path} className={navStyle}>{name}</Link>
    )
}

const SignOutButton = () => {
    const client = useApolloClient()
    const onLogout = async () => {
        localStorage.removeItem('toot-token')
        await client.resetStore()
    }
    return (
        <button className={style.button} onClick={onLogout}>Sign Out</button>
    )
}

export default Navbar;