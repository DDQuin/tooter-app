import {
    Link, useNavigate, useLocation
} from "react-router-dom"
import style from "./Navbar.module.css"
const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <nav className={style.navbar}>
            <button  onClick={() => navigate(-1)} className={style.buttonArrow}><img className={style.arrow} src={"/images/arrow.png"} alt={"Arrow"}/></button>
            <NavLink path={"/toots"} name={"Home"} isClicked={location.pathname.includes("toots")}/>
            <NavLink path={"/about"} name={"About"} isClicked={location.pathname.includes("about")}/>
        </nav>
    );
}

const NavLink = ({path, name, isClicked}) => {
    const navStyle = isClicked ? style.linkClicked: style.link
    return (
        <Link to={path} className={navStyle}>{name}</Link>
    )
}

export default Navbar;