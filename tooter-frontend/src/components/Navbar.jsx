import {
    Link, useNavigate
} from "react-router-dom"
import style from "./Navbar.module.css"
const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav className={style.navbar}>
            <button  onClick={() => navigate(-1)} className={style.buttonArrow}><img className={style.arrow} src={"/images/arrow.png"} alt={"Arrow"}/></button>

            <Link to="/" className={style.link}>Home</Link>
            <Link to="/about" className={style.link}>About</Link>
        </nav>
    );
}

export default Navbar;