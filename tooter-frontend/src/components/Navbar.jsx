import {
    Link
} from "react-router-dom"
import style from "./Navbar.module.css"
const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <Link to="/" className={style.link}>Home</Link>
            <Link to="/about" className={style.link}>About</Link>
        </nav>
    );
}

export default Navbar;