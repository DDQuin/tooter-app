import Navbar from "./components/Navbar";
import TootPage from "./pages/TootPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import {
    BrowserRouter as Router, Route, Routes, Navigate
} from "react-router-dom"
import UserPage from "./pages/UserPage";
import CommentsPage from "./pages/CommentsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CurrentUserPage from "./pages/CurrentUserPage";

const App = () => {

    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path="/" element=<Navigate replace to="/toots"/> />
                    <Route path="/toots" element={<TootPage/>}/>
                    <Route path="/me" element={<CurrentUserPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/toot/:id" element={<CommentsPage/>}/>
                    <Route path="/users/:id" element={<UserPage/>}/>
                    <Route path="/*" element=<Navigate replace to="/toots"/> />
                </Routes>
                <Footer/>
            </div>
        </Router>

    );
}

export default App;
